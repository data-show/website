# Data Show Website

Find the latest Data Show website at [data-show.com](https://www.data-show.com/).

Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), deployed on [Cloudflare](https://developers.cloudflare.com/workers/static-assets/). Content lives in `src/content` and is edited through Decap CMS at `/admin`.

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm test          # type-check + build, as run by CI
npm run deploy    # build and deploy with Wrangler
```

Requires Node.js >= 22.12 (see `.nvmrc`).

## License

MIT © [Data Show](https://www.data-show.com/)
