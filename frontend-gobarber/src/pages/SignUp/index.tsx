import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { Button, Input } from '../../components';

import { Container, Content, AnimationContainer, Background } from './styles';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: RegisterData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        const { name, email, password } = data;

        await api.post('/users', { name, email, password });

        addToast({
          type: 'success',
          title: 'Cadastrado com sucesso',
          description: `Você já pode efetuar seu logon no GoBarber usitlizando o e-mail ${email}`,
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
          title: 'Error no cadastro',
          description:
            'Ocorreu um erro eo efetuar o cadastro, verifique seus dados',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

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
              name="password"
              type="password"
              placeholder="Senha"
              autoComplete="new-password"
              icon={FiLock}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
