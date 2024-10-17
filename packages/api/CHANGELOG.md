# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.0](https://github.com/Alwatr/weaver/compare/v1.6.2...v0.2.0) (2024-10-17)

### Features

* **alwatr:** export the basic packages from `alwatr` package ([e6d7279](https://github.com/Alwatr/weaver/commit/e6d7279bf61f7f81691181d889adab95446ad26a)) by @mohammadhonarvar
* **api:** add crypto module ([888e010](https://github.com/Alwatr/weaver/commit/888e0101ea02bf0dff4b37f013f1c3e4091b0cd1)), closes [#143](https://github.com/Alwatr/weaver/issues/143) by @AliMD
* **api:** Add health check to Dockerfile ([2cec73e](https://github.com/Alwatr/weaver/commit/2cec73e69a9b9061ac027601211c452a64695250)) by @AliMD
* **api:** Add parseBodyAsJson function to handle JSON request bodies ([e613b16](https://github.com/Alwatr/weaver/commit/e613b16937d4765ad26aa08048d3379ae0bc7649)) by @AliMD
* **api:** Add route to save user data ([3714ccd](https://github.com/Alwatr/weaver/commit/3714ccd3b6116f359fa0b4240e4b40aa944db5a4)) by @AliMD
* **api:** Add route to save user data and initialize missing stores in nitrobase ([c12c8f5](https://github.com/Alwatr/weaver/commit/c12c8f58856be32b7fae3777a479b977ac7d9c3e)) by @AliMD
* **api:** Add uploadPath configuration to production environment ([78132e7](https://github.com/Alwatr/weaver/commit/78132e7c70bc3f5f61de9267338be8c0dc5a9575)) by @AliMD
* install & use `nitrobase` instead of `store` ([c07fa52](https://github.com/Alwatr/weaver/commit/c07fa52a6986e55dddcc9a10535216f3b1fe9f6c)) by @mohammadhonarvar
* install & use `nitrobase` instead of `store` & cleanup ([1f96c3d](https://github.com/Alwatr/weaver/commit/1f96c3d13af0aea2090dd2215068fb976e51cab2)) by @mohammadhonarvar
* make types in `common` globally ([82453ba](https://github.com/Alwatr/weaver/commit/82453ba55e1003499891554b1ee75db0f3c54f14)) by @mohammadhonarvar
* prevent `side-effect`s from `build` result & update deps ([4f2bc7b](https://github.com/Alwatr/weaver/commit/4f2bc7b1a32b4dbadbbc14603d23b04adf33505c)) by @mohammadhonarvar
* remove `alwatr` folder & use `alwatr` package instead. ([19fc4c4](https://github.com/Alwatr/weaver/commit/19fc4c4e7ae50383e6145a1b54ea2defdb8d5244)) by @mohammadhonarvar
* upgrade to new structure ([6cdc4ee](https://github.com/Alwatr/weaver/commit/6cdc4eefe1afaa44cddc38e177cf037166528c0f)) by @AliMD

### Bug Fixes

* **api:** `NanotronApiServerConfig` type ([6d2ea5d](https://github.com/Alwatr/weaver/commit/6d2ea5dcd6d46512d853da84a594d92b891598d7)) by @AliMD
* **api:** a `lint` error ([eb93a3b](https://github.com/Alwatr/weaver/commit/eb93a3b53b70e355111a774f8c65c67204c1e8fd)) by @mohammadhonarvar
* **api:** config types ([e483421](https://github.com/Alwatr/weaver/commit/e4834219a7619b6500bfb852ee059979a10cc84b)) by @mohammadhonarvar
* **api:** file upload route URL ([9a6c3fb](https://github.com/Alwatr/weaver/commit/9a6c3fb41a8b97c555dfd09b666b29a6e819d557)) by @AliMD
* **api:** install & use `alwatr` package ([c0b5eda](https://github.com/Alwatr/weaver/commit/c0b5eda50aa6852a3faf5ba23301d77cdd3d6186)) by @mohammadhonarvar
* **api:** install git for api build issue! ([c547b4a](https://github.com/Alwatr/weaver/commit/c547b4a39051d8582cfa9ebdf6f57e82aaa22e93)) by @AliMD
* **api:** nitrobase issue ([aa51fe1](https://github.com/Alwatr/weaver/commit/aa51fe1b1fa4e3d2fb78d925d0ec3572a42e26d1)) by @mohammadhonarvar
* **api:** remove an extra `COPY` statement ([75bc7fb](https://github.com/Alwatr/weaver/commit/75bc7fbe68bc603e3c0d6d06b5bfaeb05007d729)) by @mohammadhonarvar
* **api:** Update user route to use DictionaryReq type ([306bc76](https://github.com/Alwatr/weaver/commit/306bc760b35460c85da81e6f3cf67eece34f62d6)) by @AliMD
* **api:** use `nitrobase` instead of `store` ([6abde97](https://github.com/Alwatr/weaver/commit/6abde9762a6caa8370eb7e19158b1802d6442e7a)) by @mohammadhonarvar
* **api:** use some types & remove `upload` ([d7c93bc](https://github.com/Alwatr/weaver/commit/d7c93bcda231d904f3a2c9ff745aad6827036304)) by @mohammadhonarvar
* build issues and format codes ([f82e4d6](https://github.com/Alwatr/weaver/commit/f82e4d6bdb5e606b0f14aa5e1632c47a420c24c5)) by @AliMD
* feedbacks of `review` ([95a032e](https://github.com/Alwatr/weaver/commit/95a032e815a0e7962494f23bf30ffe672470f17c)) by @mohammadhonarvar
* **packages:** update `tsconfigs` & deps & codes ([cc68780](https://github.com/Alwatr/weaver/commit/cc687801a785e51112246eae932065821238f44e)) by @mohammadhonarvar
* remove `nano-build` options ([7628f4b](https://github.com/Alwatr/weaver/commit/7628f4b1aedb63c683e96a8de77722384359d7e6)) by @mohammadhonarvar
* rename all pmpa to weaver ([0524331](https://github.com/Alwatr/weaver/commit/052433184af7d2b0e835a810970c79ab008d71c4)) by @AliMD
* some issue ([02e561a](https://github.com/Alwatr/weaver/commit/02e561a7cd47da9796d18c8efcf4d46656f1e577)) by @mohammadhonarvar
* type errors & config errors ([ebb3409](https://github.com/Alwatr/weaver/commit/ebb340910cc065dbccb28bdd552fc4ea53fb4646)) by @mohammadhonarvar

### Code Refactoring

* **api:** initial store & new config ([08f4d6a](https://github.com/Alwatr/weaver/commit/08f4d6a064cd52464e53925acb62837c9b1b786d)) by @mohammadhonarvar
* **api:** logger usage in config.ts and crypto.ts ([4854428](https://github.com/Alwatr/weaver/commit/485442879ced4b94e343ed92e00f68e7b467800c)) by @AliMD
* **api:** Rearrange Dockerfile commands for better readability ([13a00d1](https://github.com/Alwatr/weaver/commit/13a00d1ccf98e0da3f393ef3f7b9c0206cb8f7e4)) by @AliMD
* **api:** set the required `env` keys in `DEV` & `PRODUCTION` ([3eda1bd](https://github.com/Alwatr/weaver/commit/3eda1bddae3c6392d89e62e7edaa06ae333a55e4)) by @mohammadhonarvar
* **api:** Update .gitignore to exclude 'data' directory and include 'db' directory and 'upload' directory ([441f8a4](https://github.com/Alwatr/weaver/commit/441f8a4f48ffa326d0d551f119238171e775758f)) by @AliMD
* **api:** update `config`s & rename some variables ([8b33067](https://github.com/Alwatr/weaver/commit/8b330675954af006c2afd85cdd74e9d9cc3fc01c)) by @mohammadhonarvar
* **api:** Update API URL in demo.http ([100351e](https://github.com/Alwatr/weaver/commit/100351ed3cb012d9ca409824b0061514c5b6e417)) by @AliMD
* **api:** Update base Node.js image version to 22.9.0 ([a938a6a](https://github.com/Alwatr/weaver/commit/a938a6a17f7f0e3287c0c73ef0e70c9ab6773786)) by @AliMD
* **api:** Update Dockerfile package references ([5308021](https://github.com/Alwatr/weaver/commit/5308021f1f4a4662385ab5798bca575a54dc359e)) by @AliMD
* **api:** Update Dockerfile to fix package installation process ([aab74cb](https://github.com/Alwatr/weaver/commit/aab74cbf9ef6de897137c93b7a946056a61fda3e)) by @AliMD
* **api:** Update Dockerfile to improve package installation process ([bce45e4](https://github.com/Alwatr/weaver/commit/bce45e472c74f1db5bd65beaaca6ec908135f9f7)) by @AliMD
* **api:** Update Dockerfile to improve package installation process ([b2729d8](https://github.com/Alwatr/weaver/commit/b2729d832e6ffe179bba75d0e47bbb4c6c4ca914)) by @AliMD
* **api:** Update package.json dependencies and nano-build configuration ([2b693b4](https://github.com/Alwatr/weaver/commit/2b693b4b4af3860bfc056a52992fc688f6f3e533)) by @AliMD
* **api:** update sharp dependency in api Dockerfile ([91d2b2f](https://github.com/Alwatr/weaver/commit/91d2b2f7b3076a50a79454e2f81a3ec61ade8ed1)) by @AliMD
* **config:** update appImage in swiss-plus-support.env and add sharp dependency in api Dockerfile ([ce98851](https://github.com/Alwatr/weaver/commit/ce988511865c3aba121e80b1e52baa9d5b5868a3)) by @AliMD
* **config:** update uploadPath in production environment ([1725620](https://github.com/Alwatr/weaver/commit/1725620349b78317dd98c1052046fb6bdb0f1e57)) by @AliMD
* **Dockerfile:** update base image version and environment variables ([2104e8f](https://github.com/Alwatr/weaver/commit/2104e8f4b631f6ebdb7131b77fd5e0b0e084068a)) by @AliMD
* enhance weaver cloud and config ([021b002](https://github.com/Alwatr/weaver/commit/021b002c0c2c7304b801c87aaf0b20702a43534e)) by @AliMD
* improve formatting in home route ([3916887](https://github.com/Alwatr/weaver/commit/3916887f2bf1e7f2402fe223e626dc5e7813c076)) by @AliMD
* merge & use the new structure of `weaver` ([d12e079](https://github.com/Alwatr/weaver/commit/d12e079610d7c81a6abcbe5cddc4c4b7942f0fa5)) by @mohammadhonarvar
* move the base strucuter of new `weaver` ([e16d841](https://github.com/Alwatr/weaver/commit/e16d841d40e44834ee2cfc8a8eeca2714e00e6a3)) by @mohammadhonarvar
* package.json Update dependencies and scripts ([a7826aa](https://github.com/Alwatr/weaver/commit/a7826aab31ae0d0403c7e52a155fad5a8ffcd39b)) by @AliMD
* rename storeClient to alwatrStore ([a1a94de](https://github.com/Alwatr/weaver/commit/a1a94de9b18ae7c5a7dbf61879a4195022ae047a)) by @AliMD
* update codes & fix some issues ([19b2777](https://github.com/Alwatr/weaver/commit/19b27777d8679cae52660a560b788dfd0a0246e9)) by @mohammadhonarvar
* update config.ts ([0c0f474](https://github.com/Alwatr/weaver/commit/0c0f4744bc7a79fa236f7f671d9bf599d8a1a23a)) by @AliMD
* Update config.ts to use tokenGeneratorSecret instead of STORE_TOKEN in production ([d3833a1](https://github.com/Alwatr/weaver/commit/d3833a1dfa6550ac4cb0f0826ee6ae265e3861cf)) by @AliMD
* Update crypto.ts to import AlwatrCryptoFactory from '@alwatr/nanotron' ([e3ec59f](https://github.com/Alwatr/weaver/commit/e3ec59f17085acb7954c1a4c213a7d90a2b7ac11)) by @AliMD
* Update package versions to 2.0.0-alpha.0 ([86b9a46](https://github.com/Alwatr/weaver/commit/86b9a4622d57c179227bfde80f555707c816b7eb)) by @AliMD
* use new packages ([8864819](https://github.com/Alwatr/weaver/commit/8864819528bc3b06aa548d08a3e80129279275dc)) by @mohammadhonarvar

### Miscellaneous Chores

* **api:** remove an extra option of `nitrobase` ([9786b20](https://github.com/Alwatr/weaver/commit/9786b20fae4ade0ed91d23e9840d8015b559ff13)) by @mohammadhonarvar
* fix the license to AGPL-3.0-only ([d6fbcbd](https://github.com/Alwatr/weaver/commit/d6fbcbd2360260e0c4b0feda6975e20f0fd1779b)) by @AliMD
* merge with `next` ([28e3f50](https://github.com/Alwatr/weaver/commit/28e3f50548b237aaaaf660eb7ba009f9525a49cf)) by @mohammadhonarvar
* rename all packages ([bc2ba80](https://github.com/Alwatr/weaver/commit/bc2ba80c9ae1cc9bfbb66d7ba1ae512bff73bf42)) by @AliMD

## [0.1.0](https://github.com/Alwatr/weaver/compare/v1.6.2...v0.1.0) (2024-10-14)

### Features

* **alwatr:** export the basic packages from `alwatr` package ([e6d7279](https://github.com/Alwatr/weaver/commit/e6d7279bf61f7f81691181d889adab95446ad26a)) by @mohammadhonarvar
* **api:** add crypto module ([888e010](https://github.com/Alwatr/weaver/commit/888e0101ea02bf0dff4b37f013f1c3e4091b0cd1)), closes [#143](https://github.com/Alwatr/weaver/issues/143) by @AliMD
* **api:** Add parseBodyAsJson function to handle JSON request bodies ([e613b16](https://github.com/Alwatr/weaver/commit/e613b16937d4765ad26aa08048d3379ae0bc7649)) by @AliMD
* **api:** Add route to save user data ([3714ccd](https://github.com/Alwatr/weaver/commit/3714ccd3b6116f359fa0b4240e4b40aa944db5a4)) by @AliMD
* **api:** Add route to save user data and initialize missing stores in nitrobase ([c12c8f5](https://github.com/Alwatr/weaver/commit/c12c8f58856be32b7fae3777a479b977ac7d9c3e)) by @AliMD
* **api:** Add uploadPath configuration to production environment ([78132e7](https://github.com/Alwatr/weaver/commit/78132e7c70bc3f5f61de9267338be8c0dc5a9575)) by @AliMD
* install & use `nitrobase` instead of `store` ([c07fa52](https://github.com/Alwatr/weaver/commit/c07fa52a6986e55dddcc9a10535216f3b1fe9f6c)) by @mohammadhonarvar
* install & use `nitrobase` instead of `store` & cleanup ([1f96c3d](https://github.com/Alwatr/weaver/commit/1f96c3d13af0aea2090dd2215068fb976e51cab2)) by @mohammadhonarvar
* make types in `common` globally ([82453ba](https://github.com/Alwatr/weaver/commit/82453ba55e1003499891554b1ee75db0f3c54f14)) by @mohammadhonarvar
* prevent `side-effect`s from `build` result & update deps ([4f2bc7b](https://github.com/Alwatr/weaver/commit/4f2bc7b1a32b4dbadbbc14603d23b04adf33505c)) by @mohammadhonarvar
* upgrade to new structure ([6cdc4ee](https://github.com/Alwatr/weaver/commit/6cdc4eefe1afaa44cddc38e177cf037166528c0f)) by @AliMD

### Bug Fixes

* **api:** a `lint` error ([eb93a3b](https://github.com/Alwatr/weaver/commit/eb93a3b53b70e355111a774f8c65c67204c1e8fd)) by @mohammadhonarvar
* **api:** install & use `alwatr` package ([c0b5eda](https://github.com/Alwatr/weaver/commit/c0b5eda50aa6852a3faf5ba23301d77cdd3d6186)) by @mohammadhonarvar
* **api:** install git for api build issue! ([c547b4a](https://github.com/Alwatr/weaver/commit/c547b4a39051d8582cfa9ebdf6f57e82aaa22e93)) by @AliMD
* **api:** Update user route to use DictionaryReq type ([306bc76](https://github.com/Alwatr/weaver/commit/306bc760b35460c85da81e6f3cf67eece34f62d6)) by @AliMD
* **api:** use `nitrobase` instead of `store` ([6abde97](https://github.com/Alwatr/weaver/commit/6abde9762a6caa8370eb7e19158b1802d6442e7a)) by @mohammadhonarvar
* feedbacks of `review` ([95a032e](https://github.com/Alwatr/weaver/commit/95a032e815a0e7962494f23bf30ffe672470f17c)) by @mohammadhonarvar
* **packages:** update `tsconfigs` & deps & codes ([cc68780](https://github.com/Alwatr/weaver/commit/cc687801a785e51112246eae932065821238f44e)) by @mohammadhonarvar
* remove `nano-build` options ([7628f4b](https://github.com/Alwatr/weaver/commit/7628f4b1aedb63c683e96a8de77722384359d7e6)) by @mohammadhonarvar
* rename all pmpa to weaver ([0524331](https://github.com/Alwatr/weaver/commit/052433184af7d2b0e835a810970c79ab008d71c4)) by @AliMD
* some issue ([02e561a](https://github.com/Alwatr/weaver/commit/02e561a7cd47da9796d18c8efcf4d46656f1e577)) by @mohammadhonarvar
* type errors & config errors ([ebb3409](https://github.com/Alwatr/weaver/commit/ebb340910cc065dbccb28bdd552fc4ea53fb4646)) by @mohammadhonarvar

### Code Refactoring

* **api:** logger usage in config.ts and crypto.ts ([4854428](https://github.com/Alwatr/weaver/commit/485442879ced4b94e343ed92e00f68e7b467800c)) by @AliMD
* **api:** Update .gitignore to exclude 'data' directory and include 'db' directory and 'upload' directory ([441f8a4](https://github.com/Alwatr/weaver/commit/441f8a4f48ffa326d0d551f119238171e775758f)) by @AliMD
* **api:** update `config`s & rename some variables ([8b33067](https://github.com/Alwatr/weaver/commit/8b330675954af006c2afd85cdd74e9d9cc3fc01c)) by @mohammadhonarvar
* **api:** Update API URL in demo.http ([100351e](https://github.com/Alwatr/weaver/commit/100351ed3cb012d9ca409824b0061514c5b6e417)) by @AliMD
* **api:** Update base Node.js image version to 22.9.0 ([a938a6a](https://github.com/Alwatr/weaver/commit/a938a6a17f7f0e3287c0c73ef0e70c9ab6773786)) by @AliMD
* **api:** Update package.json dependencies and nano-build configuration ([2b693b4](https://github.com/Alwatr/weaver/commit/2b693b4b4af3860bfc056a52992fc688f6f3e533)) by @AliMD
* **api:** update sharp dependency in api Dockerfile ([91d2b2f](https://github.com/Alwatr/weaver/commit/91d2b2f7b3076a50a79454e2f81a3ec61ade8ed1)) by @AliMD
* **config:** update appImage in swiss-plus-support.env and add sharp dependency in api Dockerfile ([ce98851](https://github.com/Alwatr/weaver/commit/ce988511865c3aba121e80b1e52baa9d5b5868a3)) by @AliMD
* **config:** update uploadPath in production environment ([1725620](https://github.com/Alwatr/weaver/commit/1725620349b78317dd98c1052046fb6bdb0f1e57)) by @AliMD
* **Dockerfile:** update base image version and environment variables ([2104e8f](https://github.com/Alwatr/weaver/commit/2104e8f4b631f6ebdb7131b77fd5e0b0e084068a)) by @AliMD
* enhance weaver cloud and config ([021b002](https://github.com/Alwatr/weaver/commit/021b002c0c2c7304b801c87aaf0b20702a43534e)) by @AliMD
* improve formatting in home route ([3916887](https://github.com/Alwatr/weaver/commit/3916887f2bf1e7f2402fe223e626dc5e7813c076)) by @AliMD
* merge & use the new structure of `weaver` ([d12e079](https://github.com/Alwatr/weaver/commit/d12e079610d7c81a6abcbe5cddc4c4b7942f0fa5)) by @mohammadhonarvar
* move the base strucuter of new `weaver` ([e16d841](https://github.com/Alwatr/weaver/commit/e16d841d40e44834ee2cfc8a8eeca2714e00e6a3)) by @mohammadhonarvar
* package.json Update dependencies and scripts ([a7826aa](https://github.com/Alwatr/weaver/commit/a7826aab31ae0d0403c7e52a155fad5a8ffcd39b)) by @AliMD
* rename storeClient to alwatrStore ([a1a94de](https://github.com/Alwatr/weaver/commit/a1a94de9b18ae7c5a7dbf61879a4195022ae047a)) by @AliMD
* update codes & fix some issues ([19b2777](https://github.com/Alwatr/weaver/commit/19b27777d8679cae52660a560b788dfd0a0246e9)) by @mohammadhonarvar
* update config.ts ([0c0f474](https://github.com/Alwatr/weaver/commit/0c0f4744bc7a79fa236f7f671d9bf599d8a1a23a)) by @AliMD
* Update config.ts to use tokenGeneratorSecret instead of STORE_TOKEN in production ([d3833a1](https://github.com/Alwatr/weaver/commit/d3833a1dfa6550ac4cb0f0826ee6ae265e3861cf)) by @AliMD
* Update crypto.ts to import AlwatrCryptoFactory from '@alwatr/nanotron' ([e3ec59f](https://github.com/Alwatr/weaver/commit/e3ec59f17085acb7954c1a4c213a7d90a2b7ac11)) by @AliMD
* Update package versions to 2.0.0-alpha.0 ([86b9a46](https://github.com/Alwatr/weaver/commit/86b9a4622d57c179227bfde80f555707c816b7eb)) by @AliMD
* use new packages ([8864819](https://github.com/Alwatr/weaver/commit/8864819528bc3b06aa548d08a3e80129279275dc)) by @mohammadhonarvar

### Miscellaneous Chores

* **api:** remove an extra option of `nitrobase` ([9786b20](https://github.com/Alwatr/weaver/commit/9786b20fae4ade0ed91d23e9840d8015b559ff13)) by @mohammadhonarvar
* fix the license to AGPL-3.0-only ([d6fbcbd](https://github.com/Alwatr/weaver/commit/d6fbcbd2360260e0c4b0feda6975e20f0fd1779b)) by @AliMD
* merge with `next` ([28e3f50](https://github.com/Alwatr/weaver/commit/28e3f50548b237aaaaf660eb7ba009f9525a49cf)) by @mohammadhonarvar
* rename all packages ([bc2ba80](https://github.com/Alwatr/weaver/commit/bc2ba80c9ae1cc9bfbb66d7ba1ae512bff73bf42)) by @AliMD

## [1.6.2](https://github.com/Alwatr/weaver/compare/v1.6.1...v1.6.2) (2024-04-03)

### Bug Fixes

* add base version ([555639d](https://github.com/Alwatr/weaver/commit/555639dc150461063fbe64e95b52108d2ea5ef0c)) by @

## [1.5.0](https://github.com/Alwatr/weaver/compare/v1.3.0...v1.5.0) (2024-04-02)

### Miscellaneous Chores

* fix dockerfile labels ([2f876bd](https://github.com/Alwatr/weaver/commit/2f876bde86139cc37919085a3c029f51d324f37d)) by @

## [1.4.0](https://github.com/Alwatr/weaver/compare/v1.3.0...v1.4.0) (2024-03-04)

**Note:** Version bump only for package @alwatr/weaver-api

## [1.4.0](https://github.com/Alwatr/weaver/compare/v1.3.0...v1.4.0) (2024-03-04)

**Note:** Version bump only for package @alwatr/weaver-api

## [1.2.2](https://github.com/Alwatr/weaver/compare/v1.2.1...v1.2.2) (2024-02-11)

**Note:** Version bump only for package @alwatr/weaver-api

## [1.2.1](https://github.com/Alwatr/weaver/compare/v1.2.0...v1.2.1) (2024-2-7)

**Note:** Version bump only for package @alwatr/weaver-api

## [1.2.0](https://github.com/Alwatr/weaver/compare/v1.1.2...v1.2.0) (2024-2-7)

### Features

* **types:** new package ([fe09ba6](https://github.com/Alwatr/weaver/commit/fe09ba61bc554eb5f595297fcd2bb9e313f6d646)) by @njfamirm

### Bug Fixes

* **app:** image version name ([454c35f](https://github.com/Alwatr/weaver/commit/454c35fb338041b486d8158736d5c587dc525e4a)) by @njfamirm

## [1.1.2](https://github.com/Alwatr/weaver/compare/v1.1.1...v1.1.2) (2024-02-05)

### Bug Fixes

* **deps:** remove extra ([e931175](https://github.com/Alwatr/weaver/commit/e931175a758a9c51f7e2c0a1607afc3fefe1b53c)) by @njfamirm

### Miscellaneous Chores

* **deps:** update ([e829e7e](https://github.com/Alwatr/weaver/commit/e829e7ec56dd8d38de9a6fbd3618efa8cb655465)) by @AliMD

## [1.1.1](https://github.com/Alwatr/weaver/compare/v1.1.0...v1.1.1) (2024-01-16)

### Code Refactoring

- update env name for logger enable mode ([d317dce](https://github.com/Alwatr/weaver/commit/d317dce979a3b5cb311a44c787f5ff077e9f6c80)) by @njfamirm
- use definePackage logger ([cc0d017](https://github.com/Alwatr/weaver/commit/cc0d017b11644c501080f708785ab80fcc476f23)) by @njfamirm

### Miscellaneous Chores

- **deps:** update all deps using upd command ([ebb6d7a](https://github.com/Alwatr/weaver/commit/ebb6d7aa0115706d42009f770c76f9a40d31db09)) by @njfamirm
- remove tsconfig outDir ([e713b0a](https://github.com/Alwatr/weaver/commit/e713b0a48ace5b1ea9185e7fff42f240af40c0f4)) by @njfamirm

# [1.1.0](https://github.com/Alwatr/weaver/compare/v1.0.0...v1.1.0) (2023-12-24)

**Note:** Version bump only for package @alwatr/weaver-api

# 1.0.0 (2023-12-23)

### Bug Fixes

- revert home route ([699a960](https://github.com/Alwatr/weaver/commit/699a96073bf654c6cf908033d729585ff9abe865)) by @njfamirm

### Features

- **api:** base package ([942b034](https://github.com/Alwatr/weaver/commit/942b034a2790960fb3568fb63e8bc99581c10466)) by @njfamirm
- **api:** build scripts ([8b54c83](https://github.com/Alwatr/weaver/commit/8b54c8382fced0798e3fb48788da7db22f5ebe74)) by @njfamirm
- **api:** build using nano-build ([bf4293a](https://github.com/Alwatr/weaver/commit/bf4293afdcbf9f3348b679e5bcd2a911d486b422)) by @njfamirm
- **api:** home route ([5abed49](https://github.com/Alwatr/weaver/commit/5abed493199364ebda68790431b6bf87a4892a99)) by @njfamirm
- update all configs ([5ebc1e6](https://github.com/Alwatr/weaver/commit/5ebc1e61d0175804f88a37bd4a897ba2b84fc118)) by @njfamirm
- Update Dockerfile build process ([0a0c545](https://github.com/Alwatr/weaver/commit/0a0c5458cdc8022ce53eef21ea397e29e4cf00ee)) by @AliMD
