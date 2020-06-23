import React, { useContext, useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import ImageEditor from '@react-native-community/image-editor';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { Button, Input } from '../../components';

import {
  Container,
  Title,
  UserAvatar,
  UserAvatarButton,
  UserNoAvatar,
  BackButton,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef<TextInput>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const passwordConfirmationRef = useRef<TextInput>(null);
  const { user, updateUser } = useAuth();

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: old_password => !!old_password.length,
            then: Yup.string().min(6, 'Mínimo de 6 caracteres'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: old_password => !!old_password.length,
              then: Yup.string().required('Confirmação de senha obrigatória'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), ''], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password ? data : {}),
        };

        const { data: updatedUser } = await api.put('/profile', formData);

        updateUser(updatedUser);

        Alert.alert('Perfil atualizado com sucesso');

        goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);

          return;
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizat seu perfil, tente novamente',
        );
      }
    },
    [goBack, updateUser],
  );

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar Camera',
        chooseWhichLibraryTitle: 'Escolher da galeria',
      },
      async response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar.');
          return;
        }

        const url = await ImageEditor.cropImage(response.uri, {
          offset: { x: 0, y: 0 },
          size: { height: response.height, width: response.width },
          displaySize: { height: 400, width: 400 },
          resizeMode: 'cover',
        });

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: url,
        });

        api.patch('/users/avatar', data).then(({ data: updatedUser }) => {
          updateUser(updatedUser);
        });
      },
    );
  }, [updateUser, user.id]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={32} color={colors.gray} />
          </BackButton>

          <UserAvatarButton onPress={handleUpdateAvatar}>
            {user.avatar_url ? (
              <UserAvatar source={{ uri: user.avatar_url }} />
            ) : (
              <UserNoAvatar>
                <Icon name="user" size={112} color={colors.orange} />
              </UserNoAvatar>
            )}
          </UserAvatarButton>

          <View>
            <Title>Meu Perfil</Title>
          </View>

          <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              returnKeyType="next"
              name="name"
              icon="user"
              placeholder="Nome"
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
            />
            <Input
              ref={emailRef}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              onSubmitEditing={() => {
                oldPasswordRef.current?.focus();
              }}
            />
            <Input
              containerStyle={{ marginTop: 16 }}
              ref={oldPasswordRef}
              secureTextEntry
              textContentType="oneTimeCode"
              returnKeyType="next"
              name="old_password"
              icon="lock"
              placeholder="Senha Atual"
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
            />
            <Input
              ref={passwordRef}
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="next"
              name="password"
              icon="lock"
              placeholder="Nova senha"
              onSubmitEditing={() => {
                passwordConfirmationRef.current?.focus();
              }}
            />
            <Input
              ref={passwordConfirmationRef}
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="send"
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmação de senha"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar mudanças
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
