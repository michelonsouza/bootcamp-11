import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import getQueryParam from '../../utils/getQueryParam';
import api from '../../services/api';
import { Button, Input } from '../../components';

import { Container, AnimationContainer, Content, Background } from './styles';

interface ResetPasswordFormdata {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormdata) => {
      const token = getQueryParam('token');

      if (!token) {
        addToast({
          type: 'error',
          title: 'Você não está autorizado à visualizar essa rota',
        });

        history.push('/');
      }

      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .min(6, 'Mínimo 6 caracteres')
            .required('Senha é obrigatória'),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Senhas são diferentes')
            .required('Confirmação de senha obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
          description:
            'Sua senha foi alterada, utiliza sua nova senha para efetuar logon',
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
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

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
              placeholder="Confirmação de senha"
              autoComplete="confirm-password"
              icon={FiLock}
            />

            <Button loading={loading} type="submit">
              Alterar senha
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
