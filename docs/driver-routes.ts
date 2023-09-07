// Swagger Docs

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Retrieve a list of all drivers
 *     responses:
 *       200:
 *         description: A list of drivers
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /drivers/login:
 *   post:
 *     summary: Log in as a driver
 *     parameters:
 *       - in: body
 *         name: driver
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
 * /drivers/signup:
 *   post:
 *     summary: Sign up a new driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Driver created successfully
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
 * /drivers/logout:
 *   post:
 *     summary: Log out an driver
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Server error
 */
