/** @type {import('next').NextConfig} */
/*const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig*/


module.exports = {
  async rewrites() {
    return [
      {
        source: '/planets/:id',
        destination: '/planets/id=:id'
      }
    ]
  }
}

