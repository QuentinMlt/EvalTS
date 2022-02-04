interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  adresse: Adresse;
  phone: string;
  website: string;
  company: Company;
}
interface Adresse {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: number };
}
interface Company {
  name: string;
  catchPrase: string;
  bs: string;
}
interface post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface postUser {
  user: User;
  posts: post[];
}
// let data: postUser[];

document.addEventListener('DOMContentLoaded', async () => {
  const reponseUsers = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const usersFetched = (await reponseUsers.json()) as Array<User>;

  const reponsepost = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const postFetched = (await reponsepost.json()) as Array<post>;
  const postsJoined: postUser[] = [];
  let html = '';
  for (const user of usersFetched) {
    let postsAssociated = postFetched.filter(
      (post) => user.id === post.userId
    );
    if (!postsAssociated) continue;
    let postUser: postUser = { posts: postsAssociated, user: user };
    postsJoined.push(postUser);
  }

  render(postsJoined);
});

function render(data: postUser[]) {
  let html = '';
  data.forEach((postJoined) => {
    html += `
    <div class="col-sm-2">
    <h3 class="text-info">${postJoined.user.name}</h3>
    <p>${postJoined.user.email}</p>
    <h3 class="text-warning">Titre des posts Rédigés </h3>
    <ul>
    ${postJoined.posts.map((post) => {
      return `<li>${post.title}</li>`;
    })}
    </ul>
</div>
        `;
  });
  document.querySelector('#content')!.innerHTML = html;
}
