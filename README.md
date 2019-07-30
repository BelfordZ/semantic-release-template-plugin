# Semantic Release Template Plugin

This plugin allows its user to provide a file containing a lodash template, and some data to compile the template with.

The template will always be passed the `version`.

## How to use

### Installation

```bash
npm install --save-dev semantic-release-template-plugin
```

### Adding to your .releaserc

```json
{
  "tagFormat": "${version}",
  "branch": "master",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/git",
    "@semantic-release/npm",
    "semantic-release-template-plugin"
  ],
  "verifyConditions": [
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/git",
    "@semantic-release/npm",
    {
      "path": "semantic-release-template-plugin",
      "msg": "template plugin",
      "documentLocation": "foo-test.txt",
      "templateData": {
        "abc": 123
      }
    }
  ],
  "prepare": [
    "@semantic-release/changelog",
    "@semantic-release/git",
    "@semantic-release/npm",
    {
      "path": "semantic-release-template-plugin",
      "msg": "template plugin",
      "documentLocation": "foo-test.txt",
      "templateData": {
        "abc": 123
      }
    }
  ]
}
```

## Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
