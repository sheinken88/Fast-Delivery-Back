// Swagger Docs

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Retrieve a list of all admins
 *     responses:
 *       200:
 *         description: A list of admins
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admins/login:
 *   post:
 *     summary: Log in as an admin
 *     parameters:
 *       - in: body
 *         name: admin
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admins/signup:
 *   post:
 *     summary: Sign up a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 id:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admins/logout:
 *   post:
 *     summary: Log out an admin
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Server error
 */
