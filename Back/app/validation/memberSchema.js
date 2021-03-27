const Joi = require('joi');

const textOnlyPattern = /^[A-Za-z0-9\-\s]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const requireMessage = 'Ce champ est obligatoire';

const memberSchema = Joi.object({
    nickname: Joi.string().alphanum().min(6).required().messages({
        'tring.alphanum': 'Pseudonyme ne doit contenir que des chiffres et des lettes',
        'string.min': 'Pseudonyme doit contenir au moins 6 caractères',
        'any.require': requireMessage
        }),
    first_name: Joi.string().regex(textOnlyPattern).required().messages({
        'string.pattern.base':'Nom ne doit contenir que des lettres',
        'any.require': requireMessage
        }),
    last_name: Joi.string().regex(textOnlyPattern).required().messages({
        'string.pattern.base':'Prénom ne doit contenir que des lettres',
        'any.require': requireMessage
        }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email doit contenir une adresse mail valide',
        'any.require': requireMessage
    }),
    password: Joi.string().regex(passwordPattern).strip().required().messages({
        'string.pattern?base' : 'Mot de passe doit contenir au moins 8 caractères avec minimum une majuscule, une minuscule et un caractère spécial',
        'any.require': requireMessage
    })
});

module.exports = memberSchema;