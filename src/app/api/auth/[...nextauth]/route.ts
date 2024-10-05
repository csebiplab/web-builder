/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth related operations
 */

/**
 * @swagger
 * /api/auth/[...nextauth]:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in using NextAuth
 *     description: Login with credentials using NextAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated
 */
import authOptions from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
