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
            body: 'Por favor, preencha todos os campos obrigatórios.',
        };
    }

    // Configuração do transporte para envio de e-mails (usando Gmail como exemplo)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'SEU_EMAIL@gmail.com',
            pass: 'SUA_SENHA',
        },
    });

    const mailOptions = {
        from: 'SEU_EMAIL@gmail.com',
        to: 'waltersantosfilho94@gmail.com',
        subject: `Contato do site: ${nome}`,
        text: `Nome: ${nome}\nE-mail: ${email}\nCelular: ${celular || 'Não informado'}\nMensagem: ${mensagem}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: 'E-mail enviado com sucesso!',
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Erro ao enviar o e-mail: ${error.message}`,
        };
    }
};
