const User1 = require('../models/user1');

const mockup = [
    new User1(1, 'macbook', 'Korean Seoul', '010-3756-3333', '우리 1002-632-514748', '애플', '10002-123'),
    new User1(2, 'iphone', 'America Seoul', '055-756-4433', '기업 010-3756-3485', '삼성', '1220002-123'),
    new User1(3, 'macbook2', 'Korean Deagu', '044-56-3333', 'AMEX 1002-632-514748', 'Google', '1055-123'),
    new User1(4, 'iphone2', 'America LA', '2-3756-4433', 'SAMSUNG 010-3756-3485', 'Uri', '12555002-123'),
];

module.exports = mockup;