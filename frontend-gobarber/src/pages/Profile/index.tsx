import React, { useCallback, useRef, ChangeEvent } from 'react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiCamera,
  FiArrowLeft,
  FiImage,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Button, Input } from '../../components';

import {
  Container,
  Content,
  AnimationContainer,
  AvatarInput,
  ImagePlaceholder,
} from './styles';

interface ProfileData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileData) => {
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

        const { data: updatedUserData } = await api.put('/profile', formData);

        updateUser(updatedUserData);

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description:
            'Suas informações do perfil foram atualizadas com sucesso',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);

        api
          .patch('/users/avatar', data)
          .then(({ data: userData }) => {
            updateUser(userData);

            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: 'Erro ao atualizar avatar',
              description:
                'Ocorreu um erro ao atualizar seu avatar, tente novamente',
            });
          });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard" title="Voltar ao Dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <AnimationContainer>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              {user.avatar_url ? (
                <img
                  src={
                    user.avatar_url ||
                    'https://api.adorable.io/avatars/186/michelon@email.com.png'
                  }
                  alt={user.name || 'Usuário'}
                />
              ) : (
                <ImagePlaceholder>
                  <FiImage />
                </ImagePlaceholder>
              )}
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <h1>Meu perfil</h1>

            <Input
              name="name"
              type="text"
              placeholder="Nome"
              autoComplete="new-user"
              icon={FiUser}
            />
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              autoComplete="new-email"
              icon={FiMail}
            />
            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              type="password"
              placeholder="Senha atual"
              autoComplete="new-password"
              icon={FiLock}
            />
            <Input
              name="password"
              type="password"
              placeholder="Nova senha"
              autoComplete="new-password"
              icon={FiLock}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmar senha"
              autoComplete="new-password"
              icon={FiLock}
            />

            <Button type="submit">Confirmar mudanças</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
