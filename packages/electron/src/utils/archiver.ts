import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'

class Archiver {
  onZipError: (error: Error) => void
  onZipComplete: () => void
  onUnZipComplete: (code: number) => void
  private rar_path: string
  constructor(
    public readonly zipFile: string,
    public readonly dirPath: string,
  ) {}

  /**
   * 外包传人的
   */
  get rarPath() {
    return this.rar_path
  }

  set rarPath(value: string) {
    this.rar_path = value
  }
  async unzip() {
    //解压时支持传入的rarexe路径,传入的优先
    // 默认window平台
    const unzipToolPath = './rar.exe'
    let varRarPath = this.rarPath || path.resolve(__dirname, unzipToolPath)
    console.log(varRarPath)
    console.log(this.zipFile)
    console.log(this.dirPath)
    const cmdStr = `${varRarPath} x -Pwww.ufaud.com ${this.zipFile} ${this.dirPath}\\ -y`
    console.log(cmdStr)
    let argv = ['x', '-Pwww.ufaud.com', this.zipFile, this.dirPath + '\\', '-y']
    if (process.platform === 'darwin') {
      // mac系统，直接使用unzip命令，如果本地没安装，可能失败
      varRarPath = 'unzip'
      argv = ['-P www.ufaud.com', this.zipFile, '-d ', this.dirPath]
      const osCmdStr = `${varRarPath} -P www,ufaud.com ${this.zipFile} -d ${this.dirPath}`
      console.log(
        '🚀 ~ file: archiver.ts:42 ~ Archiver ~ unzip ~ osCmdStr:',
        osCmdStr,
      )
    }
    const rarProcess = spawn(varRarPath, argv, {
      shell: true,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    })

    rarProcess.on('error', function (err) {
      console.log('extract file error')
    })

    rarProcess.on('close', (code) => {
      this.onUnZipComplete && this.onUnZipComplete(code)
      console.log('extract file success: ', code)
    })
  }
}

export default Archiver
