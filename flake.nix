{
  description = ''
  === TypeScript Development Environment
  - Remember to change the Nix-channel to your preferred one **https://nixos.wiki/wiki/Nix_channels**

  === Dev Environments
  - React JavaScript
  '';

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs = { self, nixpkgs }: let 
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    commonTools = with pkgs; [
      nodejs
      typescript-language-server
      chromium
    ];

     commonEnvironmentVariables = {
      CHROME_EXECUTABLE="${pkgs.chromium}/bin/chromium";
      };
      mkEnv = extraEnv: commonEnvironmentVariables // extraEnv;
  in {
      reactJS = pkgs.mkShell {
        buildInputs = with pkgs; [
         nodePackages.typescript
        ] ++ commonTools;

        shellHook = ''
          echo "Welcome to React JavaScript Development Environment"
        '';

       env = mkEnv{
      };
    };
  };
}
