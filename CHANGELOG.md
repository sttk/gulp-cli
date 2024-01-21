# Changelog

## [2.0.0](https://www.github.com/sttk/gulp-cli/compare/v1.0.0...v2.0.0) (2024-01-21)


### ⚠ BREAKING CHANGES

* Remove `--verify` flag (#251)
* Replace `--require` flag with `--preload`
* Normalize repository, dropping node <10.13 support (#239)

### Bug Fixes

* Access tasks correctly (closes [#28](https://www.github.com/sttk/gulp-cli/issues/28)) ([3a8d7d3](https://www.github.com/sttk/gulp-cli/commit/3a8d7d30630cd52ef16a11f88f9624626730cc3a))
* Adapt to undertaker v1.0.0 ([#87](https://www.github.com/sttk/gulp-cli/issues/87)) ([c734f01](https://www.github.com/sttk/gulp-cli/commit/c734f016f53bce61c24a58f17642080e45a49ec2))
* Allow gulpfiles specified by .gulp.* to register a loader (fixes [#181](https://www.github.com/sttk/gulp-cli/issues/181)) ([be9d25a](https://www.github.com/sttk/gulp-cli/commit/be9d25a98429e0760973147bec22e5126245a4f4))
* Avoid @babel/register test failure ([ec29169](https://www.github.com/sttk/gulp-cli/commit/ec29169c11c717208a7116b9544775e6a07ac9c8))
* Avoid false positive reporting of sync tasks on errors (fixes [#162](https://www.github.com/sttk/gulp-cli/issues/162)) ([#204](https://www.github.com/sttk/gulp-cli/issues/204)) ([d827191](https://www.github.com/sttk/gulp-cli/commit/d8271910626088ed2958be637c2f26d188653009))
* Avoid marking --tasks-json as string to catch booleans (closes [#41](https://www.github.com/sttk/gulp-cli/issues/41)) ([a4b3d64](https://www.github.com/sttk/gulp-cli/commit/a4b3d64285c267a2dd47fc20bc2347606fa88911))
* Avoid recommending npm if yarn should be used ([#158](https://www.github.com/sttk/gulp-cli/issues/158)) ([c1b261c](https://www.github.com/sttk/gulp-cli/commit/c1b261c80f75c7576f42800e6f6e338cb6277f48))
* Blacklist redirect ([#118](https://www.github.com/sttk/gulp-cli/issues/118)) ([c341b5e](https://www.github.com/sttk/gulp-cli/commit/c341b5eeacfdd1a2534e689743a04371fee0f904))
* Ensure autocompletion works (closes [#15](https://www.github.com/sttk/gulp-cli/issues/15)) ([2146218](https://www.github.com/sttk/gulp-cli/commit/2146218453a0b69fb22e2dd2176936c23d9faa3c))
* Exit with code 1 when incomplete tasks are detected on node 0.11+ (ref gulpjs/gulp[#2081](https://www.github.com/sttk/gulp-cli/issues/2081)) ([#145](https://www.github.com/sttk/gulp-cli/issues/145)) ([f57134a](https://www.github.com/sttk/gulp-cli/commit/f57134a05027eb1367975def220ed2970bad7d16))
* Improve task dependency regexp ([86bcf42](https://www.github.com/sttk/gulp-cli/commit/86bcf4272e4f478c3b11a128e396fe363a48fa66))
* Log requireFail results in yellow on stdout instead of red on stderr (fixes [#142](https://www.github.com/sttk/gulp-cli/issues/142)) ([#151](https://www.github.com/sttk/gulp-cli/issues/151)) ([e9af812](https://www.github.com/sttk/gulp-cli/commit/e9af812a4376c2890e00f50644d3a6529c6e3739))
* Mute stdout when listing tasks (closes [#24](https://www.github.com/sttk/gulp-cli/issues/24)) ([7876f7e](https://www.github.com/sttk/gulp-cli/commit/7876f7e7165d71477de6588417bbe7fef18daae5))
* Prioritize CLI flags over config file properties (fixes [#185](https://www.github.com/sttk/gulp-cli/issues/185)) ([1b80d67](https://www.github.com/sttk/gulp-cli/commit/1b80d67d6c4c7b9c80a8f49cda009187a91ad88e))
* Properly utilize env.cwd with --verify flag ([7523f64](https://www.github.com/sttk/gulp-cli/commit/7523f647397ed5fe6428cf78550b44b3cb5a6ae0))
* Remove engineStrict for other environments ([0a4cdd1](https://www.github.com/sttk/gulp-cli/commit/0a4cdd17acdf90cb24b0efaaa3bae4d6e68397d2))
* Remove shebang and x mode from index.js (fixes [#80](https://www.github.com/sttk/gulp-cli/issues/80)) ([#82](https://www.github.com/sttk/gulp-cli/issues/82)) ([d517762](https://www.github.com/sttk/gulp-cli/commit/d51776208043c949672fbee72dfb2765350afff3))
* Revert displayName change from [#53](https://www.github.com/sttk/gulp-cli/issues/53) & add regression test ([672b8a8](https://www.github.com/sttk/gulp-cli/commit/672b8a885c502e0dcb5110ce0a50752ba1bc0d68))
* Support Windows extended-length paths with path.join (fixes [#200](https://www.github.com/sttk/gulp-cli/issues/200)) ([#201](https://www.github.com/sttk/gulp-cli/issues/201)) ([8570b0c](https://www.github.com/sttk/gulp-cli/commit/8570b0c04b4cc478f88552583a7aaf7d89043862))
* Suppress logging when `--tasks-json`, `--help`, `--version` flag is specified (closes [#157](https://www.github.com/sttk/gulp-cli/issues/157)) ([#159](https://www.github.com/sttk/gulp-cli/issues/159)) ([a4236f2](https://www.github.com/sttk/gulp-cli/commit/a4236f2206c9d0313a83b24f673bf8bc80dc2447))
* Use proper require path ([360381e](https://www.github.com/sttk/gulp-cli/commit/360381ee3a03a2c0eccd60fae61d841c679d4e28))
* Use the raw GitHub URL for old blacklist ([a3d52f2](https://www.github.com/sttk/gulp-cli/commit/a3d52f2a16700838a539aab75a4a9e7f2a3dc6ce))


### Miscellaneous Chores

* Normalize repository, dropping node <10.13 support ([#239](https://www.github.com/sttk/gulp-cli/issues/239)) ([3544dc6](https://www.github.com/sttk/gulp-cli/commit/3544dc65138c6409758c28e083ea1d93640246d8))
* Remove `--verify` flag ([#251](https://www.github.com/sttk/gulp-cli/issues/251)) ([7aeee5d](https://www.github.com/sttk/gulp-cli/commit/7aeee5d82e09099696f44fae25d315ef31c14030))
* Replace `--require` flag with `--preload` ([3544dc6](https://www.github.com/sttk/gulp-cli/commit/3544dc65138c6409758c28e083ea1d93640246d8))
