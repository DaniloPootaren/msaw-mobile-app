import BottomSheet from '@gorhom/bottom-sheet';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ArrowBack from '../../assets/icons/chevron-left.svg';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {authApi} from '../../api/auth';
import {DirectusUser} from '../../shared/models';
import {AxiosError} from 'axios';
import {useAppDispatch} from '../../redux';
import {addAuthentication} from '../../redux/slices/auth';
import Loader from '../../shared/components/Loader';
import {
  MAUPASS_ACCOUNT_REGISTRATION_URL,
  MAUPASS_FORGET_PASSWORD_URL,
} from '../../shared/utils/maupass';
import {openLink} from '../../shared/utils/browser';
import {authAction} from '../../redux/actions/auth';
import {Button, Input, Text, VStack, View} from 'native-base';
import {ColorPalette} from '../../shared/utils/colors';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['85%', '85%'], []);
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {email: string; password: string}) => {
    const {email, password} = data;
    const {
      createuser,
      directusLogin,
      getMaupassCurrentUser,
      getUserbyEmail,
      loginViaMaupass,
    } = authApi;

    setLoading(true);

    await loginViaMaupass({
      usernameOrEmailAddress: email,
      password,
    })
      .then(async maupassRes => {
        const accessToken = maupassRes.data.result.accessToken;
        if (accessToken) {
          const userExistInDirectus = (await getUserbyEmail(email)).data
            .data[0];

          if (userExistInDirectus) {
            const loginUser = (await directusLogin({email, password})).data;
            dispatch(addAuthentication({auth: loginUser}));
            dispatch(
              authAction.getMeThunk(loginUser.data.access_token as string),
            );
          } else {
            const user = (await getMaupassCurrentUser(accessToken)).data.result;
            const {
              address,
              isCitizen,
              dateOfBirth,
              name,
              surname,
              fixedLineNumber,
              gender,
              phoneNumber,
              nic,
              surnameAtBirth,
              townVillage,
            } = user;
            const directusUser: DirectusUser = {
              address,
              citizen_of_mauritius: isCitizen === 1 ? true : false,
              date_of_birth: dateOfBirth,
              email,
              first_name: name,
              fixed_line_number: fixedLineNumber,
              gender,
              last_name: surname,
              mobile_number: phoneNumber,
              nic,
              password,
              surname_at_birth: surnameAtBirth,
              town: townVillage,
            };
            await createuser(directusUser).then(async () => {
              const loginUser = (await directusLogin({email, password})).data;
              dispatch(addAuthentication({auth: loginUser}));
              dispatch(
                authAction.getMeThunk(loginUser.data.access_token as string),
              );
            });
          }
        }
      })
      .catch((e: AxiosError<any>) => {
        console.log(e);
        Alert.alert(
          e.response?.data.error?.details ? 'Maupass Error' : 'Server Error',
          e.response?.data.error?.details || JSON.stringify(e),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    StatusBar.setHidden(true);

    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.goBack()}>
          <ArrowBack />
          <Text style={styles.signinText}>Sign in</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subheading}>Sign in to continue</Text>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        style={styles.bottomSheetContainer}
        handleComponent={() => null}>
        <KeyboardAwareScrollView>
          <VStack space="2xl">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  type="text"
                  placeholder="Email"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  type="password"
                  placeholder="Password"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
            <Pressable onPress={() => openLink(MAUPASS_FORGET_PASSWORD_URL)}>
              <Text
                textAlign="right"
                color={ColorPalette.paleGreyText}
                fontWeight="700">
                Forget password?
              </Text>
            </Pressable>
            <Button
              width="100%"
              disabled={!isValid}
              backgroundColor={
                isValid ? ColorPalette.primary : ColorPalette.disabledButton
              }
              onPress={handleSubmit(onSubmit)}>
              <Text color={ColorPalette.white}>Login</Text>
            </Button>
            <VStack mt={40}>
              <Text
                textAlign="center"
                color={ColorPalette.boldText}
                style={styles.label}>
                Make sure you have a Maupass account to be able to access our
                app.
              </Text>
              <Pressable
                onPress={() => openLink(MAUPASS_ACCOUNT_REGISTRATION_URL)}>
                <Text
                  textAlign="center"
                  fontSize={14}
                  fontWeight="400"
                  mt={20}
                  color={ColorPalette.boldText}>
                  Don’t have Maupass acccount?{' '}
                  <Text color={ColorPalette.primary} fontWeight="700">
                    Sign Up
                  </Text>
                </Text>
              </Pressable>
            </VStack>
          </VStack>
        </KeyboardAwareScrollView>
      </BottomSheet>
      {loading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.primary,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  heading: {
    color: ColorPalette.white,
    fontSize: 24,
    fontWeight: '700',
  },
  subheading: {
    color: ColorPalette.secondary,
    fontSize: 14,
  },
  bottomSheetContainer: {
    padding: 40,
  },
  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginTop: 10,
    marginBottom: 20,
  },
  signinText: {
    fontSize: 12,
    fontWeight: '400',
    color: ColorPalette.white,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LoginScreen;
