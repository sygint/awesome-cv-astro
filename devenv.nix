{ pkgs, lib, config, inputs, ... }:

let
  # Use nixpkgs Playwright browsers (already patched for NixOS)
  playwrightBrowsers = pkgs.playwright-driver.browsers;
in
{
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # Point Playwright to nixpkgs browsers (patched for NixOS)
  env.PLAYWRIGHT_BROWSERS_PATH = "${playwrightBrowsers}";
  env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    git
    nodePackages.pnpm
    curl
    jq
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    npm = {
      enable = true;
      install.enable = true; # Auto npm install on shell enter
    };
  };

  languages.typescript.enable = true;

  # https://devenv.sh/scripts/
  scripts.dev.exec = "npm run dev";
  scripts.build.exec = "npm run build";
  scripts.lint.exec = "npm run lint";
  scripts.test.exec = "npm test";

  # Run PDF generation with nixpkgs Playwright browsers
  scripts.build-pdf.exec = ''
    pnpm run build-pdf
  '';

  enterShell = ''
    echo "🔧 Node.js Development Environment"
    echo "=================================="
    echo "📁 Project: $(basename $(pwd))"
    echo "📦 Node.js: $(node --version) (nixpkgs: nodejs_20)"
    echo "📦 npm: $(npm --version)"
    echo "🎭 Playwright: v1.54.1 (using NixOS-patched browsers from nixpkgs)"
    echo ""
    
    # Show version detection info
    echo "📍 Version source: default"
    if [[ -f package.json ]] && command -v jq >/dev/null && jq -e '.volta.node' package.json >/dev/null 2>&1; then
      echo "   └─ package.json volta.node = $(jq -r '.volta.node' package.json)"
    elif [[ -f .nvmrc ]]; then
      echo "   └─ .nvmrc = $(cat .nvmrc)"
    else
      echo "   └─ using default Node.js 20"
    fi
    echo ""
    
    echo "🚀 Available scripts:"
    echo "  dev       - Start development server"
    echo "  build     - Build for production"  
    echo "  build-pdf - Generate PDF with Playwright"
    echo "  lint      - Run linting"
    echo "  test      - Run tests"
    echo ""
  '';

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  git-hooks.hooks.shellcheck.enable = true;
  git-hooks.hooks.nixpkgs-fmt.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
