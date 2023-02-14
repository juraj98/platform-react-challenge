# Meower

This repository is a small app that I made as an exercise during my interview process with [GWI](https://www.gwi.com/). You can see the deployed application at https://meower-git-main-juraj98.vercel.app/.

There are two backup branches in this repository:

- [before-trpc](https://github.com/juraj98/platform-react-challenge/tree/before-trpc), which shows the state of the app before I decided to build my API proxy.
- [pre-grid-rework](https://github.com/juraj98/platform-react-challenge/tree/pre-gird-rework), which shows the state of the app before I changed the grid.

## Assignment

Create a React application for cat lovers which is going to build upon thecatapi.com and will have 3 views. The **first** view displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the URL of the modal and send it to your friends - they should see the same image as you can see.

The **second** view displays a list of cat breeds. Each breed opens a modal again with a list of cat images of that breed. Each of those images must be a link to the image detail from the previous point.

The **third** view allows you do the following things:

- Display your favourite cats
- Remove an image from your favourites (use any UX option you like)

You can find the API documentation here: [https://developers.thecatapi.com/](https://developers.thecatapi.com/) We give you a lot of freedom in technologies and ways of doing things. We only insist on you using React.js. Get creative as much as you want, we WILL appreciate it. You will not be evaluated based on how well you follow these instructions, but based on how sensible your solution will be. In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.

## Assignment Analysis

The assignment seemed simple at first. A few things that stood out to me were:

- The task says to create a page with 10 cats and a Load more button. I immediately thought of creating an infinite scroll page, instead of a button that needs to be clicked. I also increased the number of images per "page" to 25, as 10 images would immediately trigger more fetching of the next page on most screens.
- You should be able to send the link for any image to your friends. This stood out to me because if you're sending links, it would be nice to have OpenGraph data attached to the link. This motivated me to reach for Next.js as my main React framework. Next.js supports SSR, which is necessary for OpenGraph data to exist in the HTML file on first load.

### Stack choices

**Next.js**
The React framework of my choice for this task. I chose this for the option to assign OpenGraph data to links. But in the end, it proved to be more useful for other challenges I encountered.

**Tailwind.css**
Tailwind.css is a utility-first CSS framework. It has gained popularity in recent years, and as I had mostly used Styled-Components before, I wanted to try it out.

**DaisyUI**
Another reason why I chose Tailwind was because of [DaisyUI](https://daisyui.com/). This is a simple UI library based entirely on CSS classes, which seemed like a good choice for this project as I didn't want to spend time tinkering with more cumbersome libraries like [MUI](https://mui.com/).

~~**TanStack Query**~~

Initially, I chose TanStack Query (formerly known as React Query) as my state management library for the project. I thought it was a perfect choice as the task mostly involved simple GET requests (only favoring images required one POST and one DELETE request). Therefore, it seemed appropriate to use this library rather than something more cumbersome like [zustand](https://github.com/pmndrs/zustand) or [jotai](https://jotai.org/). Unfortunately, due to how the data from the Cat API was structured, the use of this library proved to be more hassle than it was worth. But more about this later.

**TRPC**

TRPC is a library that enables fully typesafe API communication between the frontend and backend. It is based on TanStack Query, which allowed me to switch quickly when I realized the limitations of TanStack Query.

**axios**
We all know axios. While at first I though about using just javascript's fetch API, axios allowed me to write API requests with less code.

**zod**

Zod is a validation library. I used it to validate data from Cat API. Not much more to say.

## Building the app

I started with a simple [Vite](https://vitejs.dev/) React project. While I knew that eventually I would want to switch to Next.js, I wanted to build the UI in the simplest environment possible. I quickly put together the `MainLayout`, simple routing, the image grid, and functions for API calls.

I spent some time trying to create an animated card opening from the grid to the modal, but after it was finished, I didn't like it. Either the animation would be too quick (resulting in a swoosh of elements appearing on the screen that you couldn't appreciate without slowing down the animations in the dev console), or if I slowed the animation, it would be too slow, and the UX of the application would suffer. Furthermore, this "simple" animation required a ton of code that would not be worth maintaining in a real-world scenario.

While the Cat API provides a lot of information about cat breeds, I didn't use most of it. I only displayed the name, description, tags, and stats. I didn't want to spend much time on the UI, especially after spending time on the animation that was eventually scrapped.

### Problems with TenStack Query

I created a new Next.js app using [create-t3-app](https://create.t3.gg/), moved the UI over, and started connecting to the API. This is when I first started to run into the limitations of TenStack Query.

TenStack Query handles stale data refetching automatically by displaying old data at first and then refetching them. While this is a good thing for most applications, the fact that we're loading random cat images every time a user navigates to the home page means that they would see the cached data at first and then new data would be loaded after a second, resulting in most of the page rerendering. This behavior could be negated by setting some options.

Another limitation of loading the data all client-side was that the API key for the Cat API would be exposed. While this is not a huge issue for an interview project, it would not be acceptable in a real-world scenario.

When I started connecting the `/favorites` page, I ran into more issues with the API. The Cat API returns favorites in the following format:

```
created_at: string,
id: string
image: {
	id: string,
	url: string,
},
image_id: string,
sub_id: string,
```

I needed to know the width and height of the images for [Next/Image](https://nextjs.org/docs/api-reference/next/image).

At first, I would simply create a new request for every favorite card.

But I ran into the same issue for `/breeds`. For images, I needed to get a list of favorites so that I would know whether the image is favored or not. The advantages of TenStack Query started to dwindle.

Of course, this could be solved by using other state management libraries. If I had reached for Zustand from the get-go, I could have loaded the data that I needed and kept it in state, accessing everything that I needed with selectors.

But I already had everything built with TenStack Query in mind. There was a lot more code needed for everything to load, but it _worked_.. It's not like building custom state with Zustand would result in less code. And I thought to myself that, in a real-world scenario, you'd _(hopefully)_ not be working with an API that is this bad for my use case.

_If only I could build the API myself._

### Building the API myself.

I decided to leverage Next.js's [API routes](https://nextjs.org/docs/api-routes/introduction) to build the API. This allowed me to get the data in a format that I needed.

Plus, I could try out another technology that I've been looking at for some time - TRPC. TRPC is built on top of TenStack Query, so I could use the same patterns that I used before.

Another advantage of using API routes was that the Cat API's api key was no longer exposed to the client.

This rewrite got rid of a lot of code. I wish I had kept the commits cleaner so that I could see just how much code I got rid of.

### SEO, Metadata, and OpenGraph

Somewhere before rewriting the API, I also connected `getServerSideProps` for `image/[imageId]` route. This allowed me to add OpenGraph metatags, so users can see [image previews for links they send](https://www.opengraph.xyz/url/https%3A%2F%2Fmeower-git-main-juraj98.vercel.app%2Fimage%2FhBXicehMA).

While I was doing this I also added `<title/> ` and `description` metatags, generated with ChatGTP, for every page.

Plus I added favicon.

Sometime before rewriting the API, I also implemented `getServerSideProps` for `image/[imageId]` route. This allowed me to add OpenGraph meta tags so that users can see image previews for links they share. You can view an example of this feature in action at https://www.opengraph.xyz/url/https%3A%2F%2Fmeower-git-main-juraj98.vercel.app%2Fimage%2FhBXicehMA.

While implementing this feature, I also added `<title/>` and `description` meta tags (generated with ChatGTP) for every page and added a favicon.

### Masonry Gird Layout

The last thing I did was that I created a custom `MasonryGrid` component. This would allow the images to be displayed in a more aesthetically pleasing way, similar to grid on sites like [imgur](https://imgur.com/).

### Mobile responsiveness

Given more time, I'd improve the mobile responsiveness of the application. While the current UI works fine on desktop, it could use some work on smaller screens.
