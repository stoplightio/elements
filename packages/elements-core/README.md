[![docs](https://img.shields.io/badge/API%20Docs-site-green.svg?style=flat-square)](https://meta.stoplight.io/docs/elements)
[![license](https://img.shields.io/npm/l/@stoplight/elements?style=flat-square)](./LICENSE)

# @stoplight/elements-core

Shared core components and utilities that power the Stoplight Elements family of API documentation packages.

## Documentation

Visit our **[Documentation](https://meta.stoplight.io/docs/elements)** for getting starting, guides and demos.

## About

Elements is developed and maintained by [Stoplight][stoplight].

## Anonymized analytics

Elements uses [Scarf](https://scarf.sh/) to
collect [anonymized installation analytics](https://github.com/scarf-sh/scarf-js?tab=readme-ov-file#as-a-user-of-a-package-using-scarf-js-what-information-does-scarf-js-send-about-me).
These analytics help support the maintainers of this library and ONLY run during installation.
To [opt out](https://github.com/scarf-sh/scarf-js?tab=readme-ov-file#as-a-user-of-a-package-using-scarf-js-how-can-i-opt-out-of-analytics),
you can set the `scarfSettings.enabled` field to `false` in your project's `package.json`:

```
// package.json
{
  // ...
  "scarfSettings": {
    "enabled": false
  }
  // ...
}
```

Alternatively, you can set the environment variable `SCARF_ANALYTICS` to `false` as part of the environment that
installs your npm packages, e.g., `SCARF_ANALYTICS=false npm install`.

## License

Licensed under the Apache 2.0 License, Copyright © 2020-present Stoplight.

See [LICENSE](LICENSE) for more information.

[stoplight]: https://stoplight.io/?utm_source=github&utm_medium=elements-core&utm_campaign=readme

<img referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=82ad9f18-94ee-4fc6-8b1e-a2e5d1cd5cab&page=README.md" />
