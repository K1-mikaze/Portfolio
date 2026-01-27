{
  description = ''
    === Portfolio Development Environment

    !!! Dev Environments
    - Frontend => Environment
    - Backend => Environment , Build and Run
  '';

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    commonTools = with pkgs; [
      nodejs
    ];
  in {
    # Environments

    # Backend
    devShells."${system}" = {
      Backend = pkgs.mkShell {
        buildInputs = with pkgs;
          [
            postgresql
            typescript
          ]
          ++ commonTools;

        shellHook = ''
          echo "> Consider go to the folder back-end/ and install the dependencies if not installed"
          echo "- npm install"
          echo "==> Welcome to the Back-end Development Environment <=="
        '';

        API_PORT = 5678;
        DATABASE_URL = "postgresql://nix_user:nix_pass@localhost:5432/nix_db";
        ENV_MODE = "development";
      };

      # Frontend
      Frontend = pkgs.mkShell {
        buildInputs = [] ++ commonTools;

        shellHook = ''
          echo "> Consider go to the folder front-end/ and install the dependencies if not installed"
          echo "- npm install"
          echo "==> Welcome to the Back-end Development Environment <=="
        '';
      };
    };

    # Builds
    packages."${system}" = {
      Backend = pkgs.buildNpmPackage {
        name = "portfolio-backend";
        version = "0.0.1";
        src = ./back-end;
        npmDepsHash = "sha256-01uYVt7Y3DxMdUbJhkzqMeV/oz/APmpDaiZUQEjNY4s=";

        # copies the build output to the Nix store
        buildPhase = ''
          npm run build
        '';

        installPhase = ''
          mkdir -p $out
          cp -r build package.json node_modules $out/
        '';

        nativeBuildInputs = with pkgs; [nodejs]; # Build Dependency

        buildInputs = with pkgs; [nodejs]; # Runtime dependency

        # doCheck = true;
        # checkPhase = "npm run start";
      };
    };

    # Runnables
    apps."${system}" = {
      Backend = {
        type = "app";
        program = let
          backend = self.packages."${system}".Backend;
          script = pkgs.writeShellScriptBin "run-backend-app" ''
            cd ${backend}
            exec npm run start
          '';
        in "${script}/bin/run-backend-app";
      };

      db-start = {
        type = "app";
        program = let
          script = pkgs.writeShellScriptBin "run-database" ''
            nix develop --refresh github:K1-mikaze/Nix-Environments/main?dir=flakes/database/postgresql
          '';
        in "${script}/bin/run-database";
      };

      db-stop = {
        type = "app";
        program = let
          script = pkgs.writeShellScriptBin "stop-database" ''
            nix run github:K1-mikaze/Nix-Environments/main?dir=flakes/database/postgresql#stop
          '';
        in "${script}/bin/stop-database";
      };

      db-reset = {
        type = "app";
        program = let
          script = pkgs.writeShellScriptBin "reset-database" ''
            nix run github:K1-mikaze/Nix-Environments/main?dir=flakes/database/postgresql#reset
          '';
        in "${script}/bin/reset-database";
      };
    };
  };
}
