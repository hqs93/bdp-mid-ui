import * as path from 'path'
import * as fsPromises from 'fs/promises'

export function packagesPath () {
  return path.resolve(__dirname, '../packages')
}

export async function alias () {
  const projectPath = packagesPath()
  const dirArr = await fsPromises.readdir(projectPath)
  return dirArr.map(packagePath => {
    return {
      find:  new RegExp(`^@bdp-mid-ui\\/bdp-${packagePath}(\\/(dist))?$`),
      replacement: path.join(projectPath, `/${packagePath}/index`)
    }
  })
}
