![magren.cc](https://socialify.git.ci/Magren0321/magren.cc/image?font=Inter&forks=1&issues=1&logo=https%3A%2F%2Fmagren.cc%2F_next%2Fimage%3Furl%3D%252Favatar.png%26w%3D256%26q%3D75&name=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

# ✨ magren.cc
<a href="https://magren.cc" target="blank">View Online</a>

This project is for my personal blog and also for me to learn Next.js.  
I will continuously optimize it.

- Framework: [Next.js](https://nextjs.org/)
- Database: [Notion](https://www.notion.so/) and [Notion api](https://developers.notion.com/reference/intro)
- Styling: [Tailwindcss](https://tailwindcss.com)
- Deployment: [Vercel](https://vercel.com)

# 🎈 Running Locally
1. Create Notion Database and Notion integration. Reference [Notion api](https://developers.notion.com/docs/getting-started)

- Prepare two empty databases, one for storing blogs and one for storing reading lists.
- The database for storing blogs can refer to [Blog template](https://concrete-lightning-e25.notion.site/84fa36df17354ab98d687d616674572c?v=e4cc0da59fc84b318deffc21f0c9b4ba)
- The database for storing reading lists can refer to [ReadingList template](https://concrete-lightning-e25.notion.site/486c34163d7d432ca3aea8ac8403a5d2?v=3d7c0b72071f4ad1a4a3bcac3c91ea18)
- Create [Integrations](https://www.notion.so/my-integrations), get the token, and connect to the database

2. Clone the repository

```sh
git clone https://github.com/Magren0321/magren.cc.git
```

3.  Go to the project directory

```sh
cd magren.cc
```

4. Install dependencies

```sh
pnpm i
```

5. Set up .env file

```txt
NOTION_KEY=Your Integrations token
NOTION_DATABASE_ID=Your database id for storing blogs
NOTION_BOOK_ID=Your database id for storing reading lists
```

6. Run the development server

```sh
pnpm dev
```
