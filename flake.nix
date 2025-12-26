{
  description = ''
    === TypeScript Development Environment

    === Dev Environments
    - front-end
    - back-end
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
      typescript-language-server
      typescript
      prettier
      biome
    ];

    commonEnvironmentVariables = {};

    mkEnv = extraEnv: commonEnvironmentVariables // extraEnv;
  in {
    back-end = pkgs.mkShell {
      buildInputs = [] ++ commonTools;

      shellHook = ''
        echo "> Consider go to the folder back-end/ and install the dependencies if not installed"
        echo "- npm install"
        echo "==> Welcome to the Back-end Development Environment <=="
        echo ""
        echo "=== Database Quick Commands ==="
        echo "db-start : Starts a PostgreSQL Database"
        echo "db-permission : Give permission to the user if required"
        echo "db-stop  : Stop the PostgreSQL Database"
        echo "db-reset  : Reset All the data of the PostgreSQL Database"
        echo "> IMPORTANT: Once run one of this commands you need to exit this shell to be able to run another Database Quick Command !!"

        alias db-start="nix develop github:K1-mikaze/Nix-Environments?dir=flakes/database/postgresql"
        alias db-stop="nix run github:K1-mikaze/Nix-Environments?dir=flakes/database/postgresql#stop"
        alias db-reset="nix run github:K1-mikaze/Nix-Environments?dir=flakes/database/postgresql#reset"
        alias db-permissions="nix run github:K1-mikaze/Nix-Environments?dir=flakes/database/postgresql#connect"
      '';

      env = mkEnv {};
    };
  };
}
