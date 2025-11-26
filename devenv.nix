{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    git
    curl
    jq
    nodePackages.pnpm
  ];

  # Use nixpkgs Playwright browsers to avoid the dynamic binary issues on NixOS
  # (this points Playwright to the browsers supplied by nixpkgs)
  let
  playwrightBrowsers = pkgs.playwright.driver.browsers; # nixpkgs playwright driver path
  in

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    pnpm = {
      enable = true;
      install.enable = true; # Auto pnpm install on shell enter
    };
  };

  languages.typescript.enable = true;

  env = lib.mkMerge [
    (if playwrightBrowsers != null then { PLAYWRIGHT_BROWSERS_PATH = builtins.toString playwrightBrowsers; } else { })
    { PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1"; }
  ];

  # https://devenv.sh/scripts/
  scripts.dev.exec = "pnpm run dev";
  scripts.build.exec = "pnpm run build";
  scripts.lint.exec = "pnpm run lint";
  scripts.test.exec = "pnpm test";

  enterShell = ''
    echo "🔧 Node.js Development Environment"
    echo "=================================="
    echo "📁 Project: \$(basename \$(pwd))"
    echo "📦 Node.js: \$(node --version) (nixpkgs: nodejs_20)"
    echo "📦 pnpm: \$(pnpm --version)"
    echo ""
    
    # Show version detection info
    echo "📍 Version source: default"
    if [[ -f package.json ]] && command -v jq >/dev/null && jq -e '.volta.node' package.json >/dev/null 2>&1; then
      echo "   └─ package.json volta.node = \$(jq -r '.volta.node' package.json)"
    elif [[ -f .nvmrc ]]; then
      echo "   └─ .nvmrc = \$(cat .nvmrc)"
    else
      echo "   └─ using default Node.js 20"
    fi
    echo ""
    
    echo "🚀 Available scripts:"
    echo "  dev   - Start development server (pnpm run dev)"
    echo "  build - Build for production (pnpm run build)"
    echo "  lint  - Run linting (pnpm run lint)"
    echo "  test  - Run tests (pnpm test)"
    echo ""
    echo "💡 Using pnpm as package manager"
    echo ""
  '';

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # Uncomment to enable additional pre-commit hooks:
  # git-hooks.hooks.prettier.enable = true;
  # git-hooks.hooks.eslint.enable = true;
  # git-hooks.hooks.typos.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
