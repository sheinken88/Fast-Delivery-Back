/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Get all packages
 *     responses:
 *       200:
 *         description: A list of all packages
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Create a new package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *
 *     responses:
 *       200:
 *         description: The created package
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /packages/edit:
 *   put:
 *     summary: Edit a package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *
 *     responses:
 *       200:
 *         description: Package edited successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /packages/{id}:
 *   delete:
 *     summary: Delete a package by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the package to delete
 *     responses:
 *       202:
 *         description: Package deleted successfully
 *       404:
 *         description: Package not found
 *       500:
 *         description: Server error
 */
