const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log("Prisma is connected!");

const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.connect();
console.log("Connected to Cache!");


module.exports = {
    assets: prisma.asset,
    transactions: prisma.transaction,
    user: prisma.user,
    redis: client
};