# CBaaS

Cloud Backend as a Service

An easy-to-install, flexible REST API. Data is schemaless and new columns can be added on the fly. The API was heavily inspired by [Parse.com's REST API](https://parse.com/docs/rest) (spefically its wonderful [objects API](https://parse.com/docs/rest#objects)).

## Usage

Fork and clone.

```sh
$ npm install
$ node server
```

### REST API

The local server runs at `http://localhost:8080` by default. The base URL is `http://localhost:8080/1` (`1` is the API version).

#### Objects

Create an `object`:
```
POST /classes/MyClass
{
 "myAttr":"MyValue"
 "myInt":42
}
```

Update an `object`:

```
PUT /classes/MyClass/<objectId>
{
  "MyInt":3000
}
```

Get a single `object`:

```
GET /classes/MyClass/<objectId>
```

Get all objects of a class:

```
GET /class/MyClass
```

Query for `object`s:

```
GET /classes/MyClass/?where='{"score":3000}'
GET /classes/MyClass/?where='{"score":{"$gt":42}}'
GET /classes/MyClass/?where='{"score":{"$gt":40, "$lt":3000}}'
```

#### Caveats

This is very much a work in progress. Things that are not implemented here:

- Authentication
- Access Control Lists
- Users
- Relational Data

A quick gander at the code will reveal that this is a `mongoose` + `express` app. I'm still learning `mongoose`, so you might find features that Just Work that I a) haven't documented or b) don't even know about. I was pleasantly surprised to see that `$gt` etc worked without much effort.

TODOs:

- Finer-grained errors
- Consistent responses for certain actions, e.g., POST and DELETE
- Detailed docs, guides, and tutorials
- Package as an app generator
- Relational data/queries
- Polymorphism
- A client library or two

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.