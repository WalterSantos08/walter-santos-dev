<?php

// Captura os dados do formulário com validação básica
$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$celular = filter_input(INPUT_POST, 'celular', FILTER_SANITIZE_STRING);

// Verifica se os dados obrigatórios foram preenchidos
if (!$nome || !$email || !$celular) {
    die("Por favor, preencha todos os campos corretamente.");
}

// Configurações do e-mail
$para = "waltersantosfilho94@gmail.com";
$assunto = "Coleta de Dados - Walter Santos Dev";

$corpo = "Nome: $nome\nE-mail: $email\nCelular: $celular";

$cabeca = "From: waltersantosfilho94@gmail.com\r\n" .
          "Reply-To: $email\r\n" .
          "X-Mailer: PHP/" . phpversion();

// Envia o e-mail
if (mail($para, $assunto, $corpo, $cabeca)) {
    echo "E-mail enviado com sucesso.";
} else {
    echo "Houve um erro ao enviar o e-mail.";
}

?>
