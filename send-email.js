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
        subject: `Contato: ${nome}`,
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
