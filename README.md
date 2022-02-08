# Demo
Published [here](https://next-blog-ts-gamma.vercel.app) by Vercel

# Note

## Log 2022/02/08

- update mongoDB pwd in .env.local

## Next

### file structure
1. `pages` folder
2. `api` folder under pages folder [structuring-your-next](https://dev.to/vadorequest/a-2021-guide-about-structuring-your-next-js-project-in-a-flexible-and-efficient-way-472)
3. `_app.js` serve as root components. Add `layout` component to this component if needed

### Router
1. `useRouter()` Hook
   - query
   - push method
2. `Link` components to have a spa <a> href

### SSG: `getStaticProps()` to cope w/ pre-render
- How React cope w/ pre-render ? When use `useEffect` to Fetch data and update data tu `useState` 🡪 there will be 2 times of component render cycle, first time with init state, and the 2nd time is the fetched result. Which cause:
   - bad user exp
   - the fectched data would not show in page source (網頁原始碼) by next.js 🡪 next.js take the result of the first render cycle as pre-rendered html code 
- `getStaticProps()` execute during build proprcess. NOT on server nor clinet.
- Incremeatal static generation 🡪 `revalidate` property of the object that is return by getStaticProps() -- like you update the cache every 60s if set if there's request.
- If used in dynamic page 🡪 `getStaticPaths` is required, which retrun some obj include `paths` key and `fallback` key

### SSR: `getServerSideProps()` to cope SSR
- garanteed to run for every request 



### api routes