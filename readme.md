# Programming Language Roulette

I've been task to build something using Typescript. My goal is to produce a small web api whose purpose is to rank GitHub user by their contribution.
I've choose to go with [Deno](https://deno.com/) (/ˈdiːnoʊ/, pronounced dee-no).
It's a JavaScript, TypeScript, and WebAssembly runtime based on Rust.

## Setup

To install Deno, and run this programme:

```sh
brew install deno
```
And:
```
deno task dev
```

## Usage

```
/username/:yourusername -> Fetch the user data from github api and register it
/rank -> rank the currently registered user
```
