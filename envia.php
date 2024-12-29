<?php
    
    $nome = addcslashes($_POST['nome']);
    $email = addcslashes($_POST['email']);
    $celular = addcslashes($_POST['celular']);

    $para = "waltersantosfilho94@gmail.com"
    $assunto = "coleta de dados - walter santos dev";
    
    $corpo ="Nome: ".$nome."\n"."E-mail: ".$email."\n"."Celular: ".$celular;

    $cabeca ="From: waltersantosfilho94@gmail.com"."\n"."Reply-to: ".$email."\n"."X-Mailer:PHP/".phpversion();

    if(mail($para,$assunto,$corpo,$cabeca)){
        echo("E-mail enviado com sucesso");
    }else{
        echo("Houve um erro ao enviar o e-mail");
    }

?>
