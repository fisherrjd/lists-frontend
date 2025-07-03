{ pkgs ? import
    (fetchTarball {
      name = "jpetrucciani-2025-07-03";
      url = "https://github.com/jpetrucciani/nix/archive/ca645e44e071653a9d929afbc881db5d82f0aa31.tar.gz";
      sha256 = "0bkqajbcjwl79cnk0xs74l01iiw6hk53rdinygvmhy0172lpp2h6";
    })
    { }
}:
let
  name = "lists-frontend";


  tools = with pkgs; {
    cli = [
      jfmt
      nixup
    ];
    bun = [ bun ];
    scripts = pkgs.lib.attrsets.attrValues scripts;
  };

  scripts = with pkgs; { };
  paths = pkgs.lib.flatten [ (builtins.attrValues tools) ];
  env = pkgs.buildEnv {
    inherit name paths; buildInputs = paths;
  };
in
(env.overrideAttrs (_: {
  inherit name;
  NIXUP = "0.0.9";
})) // { inherit scripts; }
