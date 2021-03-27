const memberDataMapper = require('../datamapper/memberDataMapper');
const tripDataMapper = require('../datamapper/tripDataMapper')
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

const refreshTokens = [];

const memberController = {
    async getAllMember(_, response, next) {
        try {

            const members = await memberDataMapper.getAllMembers();

            response.json({
                data: members,
            });
        } catch (error) {
            next(error)
        }

    },

    async loginMember(request, response, next) {
        try {
            const {
                email,
                password
            } = request.body;
            const member = await memberDataMapper.getMemberLogin(email);

            // S'il existe pas on renvoie une erreur 404
            if (!member) {
                return response.status(401).json({
                    token: null,
                    message: 'Email ou mot de passe incorrect'
                })
            }

            // S'il existe pas on vérifie que le mot de passe est correct grâce à bcrypt
            const isPasswordValid = bcrypt.compareSync(
                password,
                member.password
            );

            if (!isPasswordValid) {
                // gestion des erreurs
                return response.status(401).json({
                    token: null,
                    message: 'Email ou mot de passe incorrect'
                });
            }

            // on crée le Jwt
            const jwtContent = {
                memberId: member.id
            };
            const jwtOptions = {
                algorithm: 'HS256',
                expiresIn: '3h'
            };

            
            const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_SECRET, jwtOptions);
            const refreshToken = jsonwebtoken.sign(jwtContent, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken)

            response.json({
                token: token,
                refreshToken: refreshToken
            });

        } catch (error) {
            next(error)
        }
    },

    refreshToken (request, response, next) {
        const { token } = request.body;

        if (!token) {
            return res.sendStatus(401);
        }
    
        if (!refreshTokens.includes(token)) {
            return res.sendStatus(403);
        }
    
        jwt.verify(token, refreshTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
    
            const newToken = jwt.sign({
                memberId: member.id
            }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
    
            res.json({
                token: newToken
            });
        });
    },

    async getOneMember(request, response, next) {
        try {
            const {
                memberId
            } = request.params
            const member = await tripDataMapper.getTripByMember(memberId);
            if (!member) {
                response.locals.notFound = "member";
                next();
                return
            }
            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }

    },

    async createMember(request, response, next) {
        try {
            const newMember = request.body;

            const existingMember = await memberDataMapper.getMemberLogin(newMember.email);
            
            if (existingMember) {
                return response.status(400).json({
                    message: 'Utilisateur existe déjà avec cette adresse email'
                })
            };

            const data = {
                from: 'noreply@orizons.com',
                to: 'kduvert@gmail.com',
                subject: 'Hello',
                text: 'Ceci est un test'
            };
            mg.messages().send(data, function (error, body) {
                console.log(body);
                console.log(error);
            });

            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(newMember.password, saltRounds);

            const member = await memberDataMapper.createMember({
                first_name: newMember.first_name,
                last_name: newMember.last_name,
                nickname: newMember.nickname,
                email: newMember.email,
                password: hashedPassword
            });
            response.json({
                message: member
            })
        } catch (error) {
            next(error)
        }
    },
    async updateAllMember(request, response, next) {
        try {
            const members = await memberDataMapper.updateAllMember();
            response.json({
                data: members
            })
        } catch (error) {
            next(error)
        }
    },
    async updateOneMember(request, response, next) {
        try {
            const {
                memberId
            } = request.params;

            const memberInfos = request.body;
            const member = await memberDataMapper.updateOneMember(memberId, memberInfos);
            //const member = await memberDataMapper.getMemberById(memberId)
            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }
    },
    async updateProfilePhoto(request, response, next) {
        try {
            const {
                memberId
            } = request.params;


            const {
                url
            } = request.body;


            const member = await memberDataMapper.updateProfilePhoto(memberId, url);
            response.json({
                data: member.profile_photo
            })

        } catch (error) {
            next(error)
        }
    },

    // Mise à jour des infos du profil
    async updateProfileInfos(request, response, next) {
        try {
            const {
                memberId
            } = request.params;

            const profileInfos = request.body;
            const member = await memberDataMapper.updateOneProfile(memberId, profileInfos);

            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }
    },

    async deleteAllMember(request, response, next) {
        try {

            const members = await memberDataMapper.deleteAllMember();
            response.json({
                data: members
            })
        } catch (error) {
            next(error)
        }
    },
    async deleteOneMember(request, response, next) {
        try {
            const {
                memberId
            } = request.params
            const member = await memberDataMapper.deleteOneMember(memberId);
            response.json({
                data: member
            })
        } catch (error) {
            next(error)
        }
    },
};

module.exports = memberController;