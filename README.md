## 배포 주소

[https://42blog.vercel.app](https://42blog.vercel.app)

## 실행 방법

- Development (단! 개발 환경에서는 `getStaticProps`가 매 요청마다 호출됩니다)

```bash
yarn dev
```

- Production

```bash
yarn build
yarn start
```

## 기술 정보

### FE

`Next.js`
`Typescript`
`Recoil`
`Tailwind CSS`
`Axios`
`Marked`
`EasyMDE`

### BE

`Next.js`
`MongoDB`
`Mongoose`

### DEPLOYMENT

`Vercel`

### PAGES
- User

|About|Posts|
|---|---|
|<img src="https://github.com/42KIM/blog/assets/75300807/50879470-5383-4da7-81a3-fe73032e620d" />|<img src="https://github.com/42KIM/blog/assets/75300807/63527f69-6da3-4495-8145-515b00c60774" />|
|SSG|SSG 생성 후, ISR 업데이트|

|Post|Like & Comment|
|---|---|
|<img src="https://github.com/42KIM/blog/assets/75300807/e06090f2-e7ed-4cb1-86a4-ebbb15e30f3a" />|<img src="https://github.com/42KIM/blog/assets/75300807/770c70e8-28b3-4467-ac91-c9e88298f3cf)" />|
|SSG|CSR|


- Admin

|글쓰기|글수정|
|---|---|
|<img src="https://github.com/42KIM/blog/assets/75300807/8a595ae5-d572-49bc-adc7-de6b0dbed254" />|<img src="https://github.com/42KIM/blog/assets/75300807/b6fdbfee-1d71-4def-ae2d-3f5369865d2b" />|
|SSR(auth), CSR(dynamic-import)|SSR(auth), CSR(dynamic-import)|
