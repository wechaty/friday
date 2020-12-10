/**
 * Atlassian's status page metric submitter
 *  https://statuspage.io
 */
import https from 'https'

const statusPageMetricSubmitter = (apiKey: string) => (pageId: string) => (metricId: string) => {
  const apiBase = 'https://api.statuspage.io/v1'

  const url = apiBase + '/pages/' + pageId + '/metrics/' + metricId + '/data.json'
  const authHeader = {
    Authorization: 'OAuth ' + apiKey,
  }
  const requestOptions = {
    headers: authHeader,
    method: 'POST',
  }

  return async function submit (value: number) {
    const timestamp = Math.floor(Date.now() / 1000)

    const data = {
      timestamp,
      value,
    }

    return new Promise<void>((resolve, reject) => {
      const request = https.request(url, requestOptions, function (res) {
        if (res.statusMessage === 'Unauthorized') {
          const error = new Error('Please ensure that your page code and authorization key are correct.')
          return reject(error)
        }
        res.on('error', reject)
        res.on('data', resolve)
      })
      const str = JSON.stringify({ data })
      request.end(str)
    })
  }
}

export {
  statusPageMetricSubmitter,
}
