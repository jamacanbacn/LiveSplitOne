core: bindings
	@make -C livesplit-core/js
	@cp livesplit-core/js/livesplit.js src/livesplit_core.js

wasm: bindings
	@make wasm -C livesplit-core/js
	@cp livesplit-core/js/livesplit.js src/livesplit_core.js

debug: bindings
	@make debug -C livesplit-core/js
	@cp livesplit-core/js/livesplit.js src/livesplit_core.js

bindings:
	@make bindings -C livesplit-core/js

run:
	@python -m SimpleHTTPServer 8080

web: core
	@cp livesplit-core/capi/bindings/emscripten/livesplit_core.ts src/livesplit.ts
	webpack

dll: bindings
	@cd livesplit-core && cargo build --release -p livesplit-core-capi
	@cp livesplit-core/target/release/livesplit_core_capi.dll livesplit_core.dll

electron-rebuild:
	@npm_config_target=1.6.11 \
	npm_config_arch=x64 \
	npm_config_target_arch=x64 \
	npm_config_disturl=https://atom.io/download/electron \
	npm_config_runtime=electron \
	npm_config_build_from_source=true \
	npm rebuild

electron:
	@rm src/livesplit_core.js 2>/dev/null || :
	@rm dist/bundle.js 2>/dev/null || :
	@cp livesplit-core/capi/bindings/node/livesplit_core.ts src/livesplit.ts
	@node_modules/.bin/tsc src/index.tsx --jsx 'react' --outDir 'dist/electron/' --target 'es5'

clean:
	@make clean -C livesplit-core/js
