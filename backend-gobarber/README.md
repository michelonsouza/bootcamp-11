# Funcionalidades da aplicação

## Recuperação de senha

>**RF**

- [ ] O usuário deve poder recuperar sua senha informando o seu e-mail;
- [ ] O usuário deve receber um e-mail com instruções de recuperação de senha;
- [ ] O usuário deve poder resetar sua senha;

>**RNF**

- [ ] Utilizar Mailtrap para testar envios em embiente de desenolvimento;
- [ ] Utilizar Amazon SES para envios em produção;
- [ ] O envio de e-mails deve acontecer em segundo plano (background job);

>**RN**

- [ ] O link enviado por e-mail para resetar senha, deve expirar em 2h;
- [ ] O usuário precisa confirmar a a nova senha ao alterar a senha antiga;

## Atualização do perfil

>**RF**

- [ ] O usuário deve poder atualizar seu nome, e-mail e senha;s

>**RN**

- [ ] O usuário não pode alterar seu e-mail para um e-mail já utilizado por outro usuário;
- [ ] Para atualizar sua senha o usuário deve informar a senha antiga;
- [ ] Para atualizar sua senha o usuário precisa confirmar a nova senha;

## Painel do prestador

>**RF**

- [ ] O prestador deve poder listar seus agendamentos de um dia específico;
- [ ] O prestador deve receber uma notificação sempre que houber um novo agendamento;
- [ ] O prestador deve poder visualizar as notificações não lidas;

>**RNF**

- [ ] Os agendamentos do prestador no dia devem ser armazenados em cache;
- [ ] As notificações di orestador devem ser armazenadas no MongoDB;
- [ ] As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

>**RN**

- [ ] A notificação deve ter um status de lida/não-lida para que o prestador possa controlar;

## Agendamento de serviços

>**RF**

- [ ] O usuário deve poder listar todos os prestadores de serviço cadastrados;
- [ ] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- [ ] O usuário deve poder listar horários disponíveis em um dia espećifico de um prestador;
- [ ] O usuário deve poder realizar um novo agendamento com um prestador;

>**RNF**

- [ ] A listagem de prestadores deve ser armazenada em cache;

>**RN**

- [ ] Cada agendamento deve durar 1h exatamente;
- [ ] Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- [ ] O usuário não pode agendar em um horário já ocupado;
- [ ] O usuário não pode agendar em um horário que já passou;
- [ ] O usuário não pode agendar serviços consigo mesmo;
