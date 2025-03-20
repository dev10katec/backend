const path = require('path')
const fs = require('fs')

class Storage {
  constructor() {
    this.basePublicPath = path.join(__dirname, '../public/')
    this.baseStoragePath = path.join(__dirname, '../storage/')
  }

  /**
   * Constructs an absolute public path by joining the base public path with a given relative path.
   *
   * @param {string | null} relativePath - The relative path to append, or `null`.
   * @returns {string} The absolute path within the public directory.
   */
  publicPath(relativePath = '') {
    return path.normalize(path.join(this.basePublicPath, relativePath))
  }

  /**
   * Constructs an absolute path by joining the base storage path with a given relative path.
   *
   * @param {string | null} relativePath - The relative path to append to the base storage path, or `null`.
   * @returns {string} The absolute path within the storage directory.
   */
  storagePath(relativePath = '') {
    return path.normalize(path.join(this.baseStoragePath, relativePath))
  }

  ensureDirectoryExistence(filePath) {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  /**
   * Stores a file at a specified location with a given name.
   *
   * @param {string} file - The path to the source file to be stored.
   * @param {string} output - The directory where the file will be stored.
   * @param {string} fileName - The name to assign to the stored file.
   * @returns {void}
   */
  async storeAs(file, output, fileName) {
    this.ensureDirectoryExistence(path.join(output, fileName))
    const filePath = path.join(output, fileName)
    const buffer = fs.readFileSync(file)
    return fs.writeFileSync(filePath, buffer)
  }

  /**
   * Asynchronously removes a file at the specified path.
   *
   * @param {string} filePath - The path to the file to be removed.
   * @throws {SystemException} If the file does not exist at the specified path.
   * @returns {Promise<void>} A promise that resolves when the file is successfully removed.
   */
  async unlink(filePath) {
    return fs.unlinkSync(filePath)
  }
}

const storage = new Storage()
module.exports = storage
