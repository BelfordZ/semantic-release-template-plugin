# Semantic Release Template Plugin

This plugin allows its user to provide a file containing a lodash template, and some data to compile the template with.

The template will always be passed the `version`.

## How to use

### Installation

```bash
npm install --save-dev semantic-release-template-plugin
```

### Adding to your .releaserc

```
{
  ...
  "plugins": [
    ...,
    {
      "path": "semantic-release-template-plugin",
      "documentLocation": "./my-template.txt",
      "templateData": {
        "abc": 123

      }
    }
    ...
  ],
  "verifyConditions": ["semantic-release-template-plugin"],
  "prepare": ["semantic-release-template-plugin"]
}
```

## Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
