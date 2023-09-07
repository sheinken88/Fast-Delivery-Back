/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A list of all orders
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: The details of the order
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/driver/{id}:
 *   get:
 *     summary: Get orders by driver ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the driver to retrieve orders for
 *     responses:
 *       200:
 *         description: A list of orders for the driver
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *               packages:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Server error
 */
