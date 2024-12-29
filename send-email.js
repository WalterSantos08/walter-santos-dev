const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Método não permitido',
        };
    }

    const { nome, email, celular, mensagem } = JSON.parse(event.body);

    if (!nome || !email || !mensagem) {
        return {
            statusCode: 400,
            body: 'Preencha todos os campos obrigatórios.',
        };
    }

    // Log para verificar os dados recebidos
    console.log('Dados recebidos:', { nome, email, celular, mensagem });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'SEU_EMAIL@gmail.com',  // Substitua com o seu e-mail
            pass: 'SUA_SENHA',  // Substitua com a sua senha
        },
    });

    const mailOptions = {
        from: 'SEU_EMAIL@gmail.com', // Substitua com o seu e-mail
        to: 'waltersantosfilho94@gmail.com', // Para onde o e-mail será enviado
        subject: `Contato: ${nome}`,
        text: `Nome: ${nome}\nE-mail: ${email}\nCelular: ${celular || 'Não informado'}\nMensagem: ${mensagem}`,
    };

    try {
        // Log para verificar antes do envio do e-mail
        console.log('Enviando e-mail...');
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: 'E-mail enviado com sucesso!',
        };
    } catch (error) {
        // Log para capturar o erro e exibir
        console.error('Erro ao enviar e-mail:', error);
        return {
            statusCode: 500,
            body: `Erro ao enviar o e-mail: ${error.message}`,
        };
    }
};
