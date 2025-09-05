2025-09-05T09:47:10.025019571Z [inf]  
2025-09-05T09:47:11.475430935Z [inf]  [35m[Region: us-east4][0m
2025-09-05T09:47:11.479848190Z [inf]  [35m==============
2025-09-05T09:47:11.479908594Z [inf]  Using Nixpacks
2025-09-05T09:47:11.479917298Z [inf]  ==============
2025-09-05T09:47:11.479923810Z [inf]  [0m
2025-09-05T09:47:11.480127854Z [inf]  context: sdc6-sfQw
2025-09-05T09:47:11.784204596Z [inf]  ╔══════════════════════════════ Nixpacks v1.38.0 ══════════════════════════════╗
2025-09-05T09:47:11.784242772Z [inf]  ║ setup      │ nodejs_22, pnpm-9_x, openssl, libnss3, libatk1.0-0, libatk-     ║
2025-09-05T09:47:11.784248879Z [inf]  ║            │ bridge2.0-0, libcups2, libgbm1, libasound2t64, libpangocairo-   ║
2025-09-05T09:47:11.784253957Z [inf]  ║            │ 1.0-0, libxss1, libgtk-3-0, libxshmfence1, libglu1, chromium    ║
2025-09-05T09:47:11.784262409Z [inf]  ║──────────────────────────────────────────────────────────────────────────────║
2025-09-05T09:47:11.784266767Z [inf]  ║ install    │ npm install -g corepack@0.24.1 && corepack enable               ║
2025-09-05T09:47:11.784272302Z [inf]  ║            │ pnpm i --frozen-lockfile                                        ║
2025-09-05T09:47:11.784276810Z [inf]  ║──────────────────────────────────────────────────────────────────────────────║
2025-09-05T09:47:11.784281668Z [inf]  ║ build      │ pnpm install && pnpm build                                      ║
2025-09-05T09:47:11.784285778Z [inf]  ║──────────────────────────────────────────────────────────────────────────────║
2025-09-05T09:47:11.784290255Z [inf]  ║ start      │ cd apps/web && pnpm start                                       ║
2025-09-05T09:47:11.784294432Z [inf]  ╚══════════════════════════════════════════════════════════════════════════════╝
2025-09-05T09:47:12.164420764Z [inf]  [internal] load build definition from Dockerfile
2025-09-05T09:47:12.164480983Z [inf]  [internal] load build definition from Dockerfile
2025-09-05T09:47:12.164516298Z [inf]  [internal] load build definition from Dockerfile
2025-09-05T09:47:12.164533563Z [inf]  [internal] load build definition from Dockerfile
2025-09-05T09:47:12.175808277Z [inf]  [internal] load build definition from Dockerfile
2025-09-05T09:47:12.178461511Z [inf]  [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-09-05T09:47:12.238346236Z [inf]  [internal] load metadata for ghcr.io/railwayapp/nixpacks:ubuntu-1745885067
2025-09-05T09:47:12.238613198Z [inf]  [internal] load .dockerignore
2025-09-05T09:47:12.238948189Z [inf]  [internal] load .dockerignore
2025-09-05T09:47:12.239012511Z [inf]  [internal] load .dockerignore
2025-09-05T09:47:12.249181191Z [inf]  [internal] load .dockerignore
2025-09-05T09:47:12.260418634Z [inf]  [stage-0 11/12] RUN printf '\nPATH=/app/node_modules/.bin:$PATH' >> /root/.profile
2025-09-05T09:47:12.260461696Z [inf]  [stage-0 10/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-node_modules/cache,target=/app/node_modules/.cache pnpm install && pnpm build
2025-09-05T09:47:12.260477244Z [inf]  [stage-0  9/12] COPY . /app/.
2025-09-05T09:47:12.260490438Z [inf]  [stage-0  8/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm i --frozen-lockfile
2025-09-05T09:47:12.260510830Z [inf]  [stage-0  7/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 npm install -g corepack@0.24.1 && corepack enable
2025-09-05T09:47:12.260524839Z [inf]  [stage-0  1/12] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-09-05T09:47:12.260539600Z [inf]  [stage-0  5/12] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2t64 libpangocairo-1.0-0 libxss1 libgtk-3-0 libxshmfence1 libglu1 chromium
2025-09-05T09:47:12.260555317Z [inf]  [stage-0  4/12] RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d
2025-09-05T09:47:12.260566976Z [inf]  [stage-0  3/12] COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
2025-09-05T09:47:12.260574887Z [inf]  [internal] load build context
2025-09-05T09:47:12.260582812Z [inf]  [stage-0  2/12] WORKDIR /app/
2025-09-05T09:47:12.260592492Z [inf]  [stage-0 12/12] COPY . /app
2025-09-05T09:47:12.260603847Z [inf]  [stage-0  6/12] COPY . /app/.
2025-09-05T09:47:12.260624522Z [inf]  [stage-0  1/12] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-09-05T09:47:12.260632665Z [inf]  [internal] load build context
2025-09-05T09:47:12.260667667Z [inf]  [internal] load build context
2025-09-05T09:47:12.270003973Z [inf]  [stage-0  1/12] FROM ghcr.io/railwayapp/nixpacks:ubuntu-1745885067@sha256:d45c89d80e13d7ad0fd555b5130f22a866d9dd10e861f589932303ef2314c7de
2025-09-05T09:47:12.527644969Z [inf]  [internal] load build context
2025-09-05T09:47:12.534060892Z [inf]  [stage-0  2/12] WORKDIR /app/
2025-09-05T09:47:12.534131492Z [inf]  [stage-0  3/12] COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
2025-09-05T09:47:12.558915656Z [inf]  [stage-0  3/12] COPY .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
2025-09-05T09:47:12.560733597Z [inf]  [stage-0  4/12] RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d
2025-09-05T09:47:12.72494501Z [inf]  unpacking 'https://github.com/NixOS/nixpkgs/archive/ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.tar.gz' into the Git cache...

2025-09-05T09:47:43.728931741Z [inf]  unpacking 'https://github.com/railwayapp/nix-npm-overlay/archive/main.tar.gz' into the Git cache...

2025-09-05T09:47:44.187328306Z [inf]  installing 'ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7-env'

2025-09-05T09:47:44.900330097Z [inf]  these 5 derivations will be built:
  /nix/store/crmicnx1sb63i6q6md7i8vz9mxb5cair-pnpm-9.15.9.tgz.drv
  /nix/store/39q7099jg9cxpbhan0w51gs7m1drhrwg-pnpm.drv
  /nix/store/l8kk1pz2miykkhlwl628qslhxx1lkc1m-libraries.drv
  /nix/store/wbmzgs2l5v4fq166cfg80qqv1pypd1lv-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7-env.drv
  /nix/store/1v24l28yvkq5gamk83f6wvmka98y4zrw-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7-env.drv

2025-09-05T09:47:44.900355682Z [inf]  these 86 paths will be fetched (126.25 MiB download, 593.56 MiB unpacked):

2025-09-05T09:47:44.900388735Z [inf]    /nix/store/cf7gkacyxmm66lwl5nj6j6yykbrg4q5c-acl-2.3.2
  /nix/store/a9jgnlhkjkxav6qrc3rzg2q84pkl2wvr-attr-2.5.2
  /nix/store/5mh7kaj2fyv8mk4sfq1brwxgc02884wi-bash-5.2p37
  /nix/store/j7p46r8v9gcpbxx89pbqlh61zhd33gzv-binutils-2.43.1
  /nix/store/df2a8k58k00f2dh2x930dg6xs6g6mliv-binutils-2.43.1-lib

2025-09-05T09:47:44.900397426Z [inf]    /nix/store/srcmmqi8kxjfygd0hyy42c8hv6cws83b-binutils-wrapper-2.43.1
  /nix/store/wf5zj2gbib3gjqllkabxaw4dh0gzcla3-builder.pl
  /nix/store/ivl2v8rgg7qh1jkj5pwpqycax3rc2hnl-bzip2-1.0.8
  /nix/store/mglixp03lsp0w986svwdvm7vcy17rdax-bzip2-1.0.8-bin
  /nix/store/4s9rah4cwaxflicsk5cndnknqlk9n4p3-coreutils-9.5
  /nix/store/pkc7mb4a4qvyz73srkqh4mwl70w98dsv-curl-8.11.0
  /nix/store/p123cq20klajcl9hj8jnkjip5nw6awhz-curl-8.11.0-bin
  /nix/store/5f5linrxzhhb3mrclkwdpm9bd8ygldna-curl-8.11.0-dev

2025-09-05T09:47:44.900430385Z [inf]    /nix/store/agvks3qmzja0yj54szi3vja6vx3cwkkw-curl-8.11.0-man
  /nix/store/00g69vw7c9lycy63h45ximy0wmzqx5y6-diffutils-3.10
  /nix/store/74h4z8k82pmp24xryflv4lxkz8jlpqqd-ed-1.20.2
  /nix/store/qbry6090vlr9ar33kdmmbq2p5apzbga8-expand-response-params
  /nix/store/c4rj90r2m89rxs64hmm857mipwjhig5d-file-5.46
  /nix/store/jqrz1vq5nz4lnv9pqzydj0ir58wbjfy1-findutils-4.10.0
  /nix/store/a3c47r5z1q2c4rz0kvq8hlilkhx2s718-gawk-5.3.1
  /nix/store/l89iqc7am6i60y8vk507zwrzxf0wcd3v-gcc-14-20241116
  /nix/store/bpq1s72cw9qb2fs8mnmlw6hn2c7iy0ss-gcc-14-20241116-lib

2025-09-05T09:47:44.900437479Z [inf]    /nix/store/17v0ywnr3akp85pvdi56gwl99ljv95kx-gcc-14-20241116-libgcc
  /nix/store/xcn9p4xxfbvlkpah7pwchpav4ab9d135-gcc-wrapper-14-20241116
  /nix/store/65h17wjrrlsj2rj540igylrx7fqcd6vq-glibc-2.40-36

2025-09-05T09:47:44.900442144Z [inf]    /nix/store/1c6bmxrrhm8bd26ai2rjqld2yyjrxhds-glibc-2.40-36-bin
  /nix/store/kj8hbqx4ds9qm9mq7hyikxyfwwg13kzj-glibc-2.40-36-dev

2025-09-05T09:47:44.900445502Z [inf]    /nix/store/kryrg7ds05iwcmy81amavk8w13y4lxbs-gmp-6.3.0

2025-09-05T09:47:44.900451097Z [inf]    /nix/store/a2byxfv4lc8f2g5xfzw8cz5q8k05wi29-gmp-with-cxx-6.3.0
  /nix/store/1m67ipsk39xvhyqrxnzv2m2p48pil8kl-gnu-config-2024-01-01
  /nix/store/aap6cq56amx4mzbyxp2wpgsf1kqjcr1f-gnugrep-3.11

2025-09-05T09:47:44.900471162Z [inf]    /nix/store/fp6cjl1zcmm6mawsnrb5yak1wkz2ma8l-gnumake-4.4.1
  /nix/store/abm77lnrkrkb58z6xp1qwjcr1xgkcfwm-gnused-4.9
  /nix/store/9cwwj1c9csmc85l2cqzs3h9hbf1vwl6c-gnutar-1.35
  /nix/store/nvvj6sk0k6px48436drlblf4gafgbvzr-gzip-1.13
  /nix/store/wwipgdqb4p2fr46kmw9c5wlk799kbl68-icu4c-74.2
  /nix/store/m8w3mf0i4862q22bxad0wspkgdy4jnkk-icu4c-74.2-dev
  /nix/store/xmbv8s4p4i4dbxgkgdrdfb0ym25wh6gk-isl-0.20

2025-09-05T09:47:44.900475018Z [inf]    /nix/store/2wh1gqyzf5xsvxpdz2k0bxiz583wwq29-keyutils-1.6.3-lib
  /nix/store/milph81dilrh96isyivh5n50agpx39k2-krb5-1.21.3

2025-09-05T09:47:44.900488934Z [inf]    /nix/store/b56mswksrql15knpb1bnhv3ysif340kd-krb5-1.21.3-dev
  /nix/store/v9c1s50x7magpiqgycxxkn36avzbcg0g-krb5-1.21.3-lib

2025-09-05T09:47:44.90049219Z [inf]    /nix/store/nlqind4szw3amcmhgy4pd2n0894558gg-libX11-1.8.10
  /nix/store/hjbxiwsc587b8dc6v6pisa34aj10hq23-libXau-1.0.11

2025-09-05T09:47:44.900540816Z [inf]    /nix/store/c9gk656q2x8av467r06hcjag31drjfzh-libXdmcp-1.1.5
  /nix/store/r87iqz07igmwfvb12mgr6rmpb6353ys4-libXext-1.3.6
  /nix/store/5mb70vg3kdzkyn0zqdgm4f87mdi0yi4i-libglvnd-1.7.0
  /nix/store/34z2792zyd4ayl5186vx0s98ckdaccz9-libidn2-2.3.7
  /nix/store/2a3anh8vl3fcgk0fvaravlimrqawawza-libmpc-1.3.1
  /nix/store/8675pnfr4fqnwv4pzjl67hdwls4q13aa-libssh2-1.11.1
  /nix/store/d7zhcrcc7q3yfbm3qkqpgc3daq82spwi-libssh2-1.11.1-dev
  /nix/store/xcqcgqazykf6s7fsn08k0blnh0wisdcl-libunistring-1.3
  /nix/store/r9ac2hwnmb0nxwsrvr6gi9wsqf2whfqj-libuv-1.49.2
  /nix/store/ll14czvpxglf6nnwmmrmygplm830fvlv-libuv-1.49.2-dev
  /nix/store/2j3c18398phz5c1376x2qvva8gx9g551-libxcb-1.17.0
  /nix/store/6cr0spsvymmrp1hj5n0kbaxw55w1lqyp-libxcrypt-4.4.36
  /nix/store/pc74azbkr19rkd5bjalq2xwx86cj3cga-linux-headers-6.12

2025-09-05T09:47:44.900557335Z [inf]    /nix/store/fv7gpnvg922frkh81w5hkdhpz0nw3iiz-mirrors-list
  /nix/store/qs22aazzrdd4dnjf9vffl0n31hvls43h-mpfr-4.2.1
  /nix/store/grixvx878884hy8x3xs0c0s1i00j632k-nghttp2-1.64.0
  /nix/store/dz97fw51rm5bl9kz1vg0haj1j1a7r1mr-nghttp2-1.64.0-dev
  /nix/store/qcghigzrz56vczwlzg9c02vbs6zr9jkz-nghttp2-1.64.0-lib
  /nix/store/fkyp1bm5gll9adnfcj92snyym524mdrj-nodejs-22.11.0
  /nix/store/9l9n7a0v4aibcz0sgd0crs209an9p7dz-openssl-3.3.2
  /nix/store/h1ydpxkw9qhjdxjpic1pdc2nirggyy6f-openssl-3.3.2
  /nix/store/lygl27c44xv73kx1spskcgvzwq7z337c-openssl-3.3.2-bin

2025-09-05T09:47:44.900562924Z [inf]    /nix/store/qq5q0alyzywdazhmybi7m69akz0ppk05-openssl-3.3.2-bin
  /nix/store/kqm7wpqkzc4bwjlzqizcbz0mgkj06a9x-openssl-3.3.2-dev
  /nix/store/pp2zf8bdgyz60ds8vcshk2603gcjgp72-openssl-3.3.2-dev

2025-09-05T09:47:44.900568983Z [inf]    /nix/store/q10wlq1brcnc21v5qvhbj9fwlf806dgm-openssl-3.3.2-man
  /nix/store/5yja5dpk2qw1v5mbfbl2d7klcdfrh90w-patch-2.7.6

2025-09-05T09:47:44.900573417Z [inf]    /nix/store/srfxqk119fijwnprgsqvn68ys9kiw0bn-patchelf-0.15.0
  /nix/store/3j1p598fivxs69wx3a657ysv3rw8k06l-pcre2-10.44
  /nix/store/1i003ijlh9i0mzp6alqby5hg3090pjdx-perl-5.40.0

2025-09-05T09:47:44.900578296Z [inf]    /nix/store/dj96qp9vps02l3n8xgc2vallqa9rhafb-sqlite-3.47.0
  /nix/store/yc39wvfz87i0bl8r6vnhq48n6clbx2pb-sqlite-3.47.0-bin

2025-09-05T09:47:44.900582938Z [inf]    /nix/store/i47d0rzbbnihcxkcaj48jgii5pj58djc-sqlite-3.47.0-dev
  /nix/store/4ig84cyqi6qy4n0sanrbzsw1ixa497jx-stdenv-linux
  /nix/store/d0gfdcag8bxzvg7ww4s7px4lf8sxisyx-stdenv-linux

2025-09-05T09:47:44.900589968Z [inf]    /nix/store/d29r1bdmlvwmj52apgcdxfl1mm9c5782-update-autotools-gnu-config-scripts-hook
  /nix/store/2phvd8h14vwls0da1kmsxc73vzmhkm3b-util-linux-minimal-2.39.4-lib

2025-09-05T09:47:44.900594358Z [inf]    /nix/store/acfkqzj5qrqs88a4a6ixnybbjxja663d-xgcc-14-20241116-libgcc
  /nix/store/c2njy6bv84kw1i4bjf5k5gn7gz8hn57n-xz-5.6.3
  /nix/store/h18s640fnhhj2qdh5vivcfbxvz377srg-xz-5.6.3-bin

2025-09-05T09:47:44.900602178Z [inf]    /nix/store/cqlaa2xf6lslnizyj9xqa8j0ii1yqw0x-zlib-1.3.1
  /nix/store/1lggwqzapn5mn49l9zy4h566ysv9kzdb-zlib-1.3.1-dev

2025-09-05T09:47:44.908459885Z [inf]  copying path '/nix/store/wf5zj2gbib3gjqllkabxaw4dh0gzcla3-builder.pl' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.910221958Z [inf]  copying path '/nix/store/q10wlq1brcnc21v5qvhbj9fwlf806dgm-openssl-3.3.2-man' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.91256003Z [inf]  copying path '/nix/store/17v0ywnr3akp85pvdi56gwl99ljv95kx-gcc-14-20241116-libgcc' from 'https://cache.nixos.org'...
copying path '/nix/store/1m67ipsk39xvhyqrxnzv2m2p48pil8kl-gnu-config-2024-01-01' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.913035505Z [inf]  copying path '/nix/store/acfkqzj5qrqs88a4a6ixnybbjxja663d-xgcc-14-20241116-libgcc' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.913288636Z [inf]  copying path '/nix/store/xcqcgqazykf6s7fsn08k0blnh0wisdcl-libunistring-1.3' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.916422013Z [inf]  copying path '/nix/store/pc74azbkr19rkd5bjalq2xwx86cj3cga-linux-headers-6.12' from 'https://cache.nixos.org'...
copying path '/nix/store/fv7gpnvg922frkh81w5hkdhpz0nw3iiz-mirrors-list' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.916919107Z [inf]  copying path '/nix/store/agvks3qmzja0yj54szi3vja6vx3cwkkw-curl-8.11.0-man' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.918081296Z [inf]  copying path '/nix/store/grixvx878884hy8x3xs0c0s1i00j632k-nghttp2-1.64.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.921161527Z [inf]  copying path '/nix/store/d29r1bdmlvwmj52apgcdxfl1mm9c5782-update-autotools-gnu-config-scripts-hook' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.957754826Z [inf]  copying path '/nix/store/34z2792zyd4ayl5186vx0s98ckdaccz9-libidn2-2.3.7' from 'https://cache.nixos.org'...

2025-09-05T09:47:44.97506318Z [inf]  copying path '/nix/store/65h17wjrrlsj2rj540igylrx7fqcd6vq-glibc-2.40-36' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.626942656Z [inf]  copying path '/nix/store/a9jgnlhkjkxav6qrc3rzg2q84pkl2wvr-attr-2.5.2' from 'https://cache.nixos.org'...
copying path '/nix/store/5mh7kaj2fyv8mk4sfq1brwxgc02884wi-bash-5.2p37' from 'https://cache.nixos.org'...
copying path '/nix/store/ivl2v8rgg7qh1jkj5pwpqycax3rc2hnl-bzip2-1.0.8' from 'https://cache.nixos.org'...
copying path '/nix/store/74h4z8k82pmp24xryflv4lxkz8jlpqqd-ed-1.20.2' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.62703059Z [inf]  copying path '/nix/store/qbry6090vlr9ar33kdmmbq2p5apzbga8-expand-response-params' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627082425Z [inf]  copying path '/nix/store/a3c47r5z1q2c4rz0kvq8hlilkhx2s718-gawk-5.3.1' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627168425Z [inf]  copying path '/nix/store/bpq1s72cw9qb2fs8mnmlw6hn2c7iy0ss-gcc-14-20241116-lib' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627387369Z [inf]  copying path '/nix/store/kryrg7ds05iwcmy81amavk8w13y4lxbs-gmp-6.3.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627433633Z [inf]  copying path '/nix/store/1c6bmxrrhm8bd26ai2rjqld2yyjrxhds-glibc-2.40-36-bin' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627635557Z [inf]  copying path '/nix/store/abm77lnrkrkb58z6xp1qwjcr1xgkcfwm-gnused-4.9' from 'https://cache.nixos.org'...
copying path '/nix/store/fp6cjl1zcmm6mawsnrb5yak1wkz2ma8l-gnumake-4.4.1' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627706179Z [inf]  copying path '/nix/store/2wh1gqyzf5xsvxpdz2k0bxiz583wwq29-keyutils-1.6.3-lib' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627849736Z [inf]  copying path '/nix/store/hjbxiwsc587b8dc6v6pisa34aj10hq23-libXau-1.0.11' from 'https://cache.nixos.org'...
copying path '/nix/store/r9ac2hwnmb0nxwsrvr6gi9wsqf2whfqj-libuv-1.49.2' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.627921101Z [inf]  copying path '/nix/store/c9gk656q2x8av467r06hcjag31drjfzh-libXdmcp-1.1.5' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.666511953Z [inf]  copying path '/nix/store/6cr0spsvymmrp1hj5n0kbaxw55w1lqyp-libxcrypt-4.4.36' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.669179978Z [inf]  copying path '/nix/store/qcghigzrz56vczwlzg9c02vbs6zr9jkz-nghttp2-1.64.0-lib' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.673614183Z [inf]  copying path '/nix/store/9l9n7a0v4aibcz0sgd0crs209an9p7dz-openssl-3.3.2' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.673740059Z [inf]  copying path '/nix/store/h1ydpxkw9qhjdxjpic1pdc2nirggyy6f-openssl-3.3.2' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.673750064Z [inf]  copying path '/nix/store/5yja5dpk2qw1v5mbfbl2d7klcdfrh90w-patch-2.7.6' from 'https://cache.nixos.org'...
copying path '/nix/store/3j1p598fivxs69wx3a657ysv3rw8k06l-pcre2-10.44' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.673977239Z [inf]  copying path '/nix/store/mglixp03lsp0w986svwdvm7vcy17rdax-bzip2-1.0.8-bin' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.678825202Z [inf]  copying path '/nix/store/cf7gkacyxmm66lwl5nj6j6yykbrg4q5c-acl-2.3.2' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.681234194Z [inf]  copying path '/nix/store/ll14czvpxglf6nnwmmrmygplm830fvlv-libuv-1.49.2-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.684077646Z [inf]  copying path '/nix/store/2j3c18398phz5c1376x2qvva8gx9g551-libxcb-1.17.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.684326223Z [inf]  copying path '/nix/store/2phvd8h14vwls0da1kmsxc73vzmhkm3b-util-linux-minimal-2.39.4-lib' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.687988576Z [inf]  copying path '/nix/store/dz97fw51rm5bl9kz1vg0haj1j1a7r1mr-nghttp2-1.64.0-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.689364305Z [inf]  copying path '/nix/store/xmbv8s4p4i4dbxgkgdrdfb0ym25wh6gk-isl-0.20' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.693413635Z [inf]  copying path '/nix/store/qs22aazzrdd4dnjf9vffl0n31hvls43h-mpfr-4.2.1' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.693468835Z [inf]  copying path '/nix/store/9cwwj1c9csmc85l2cqzs3h9hbf1vwl6c-gnutar-1.35' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.701676508Z [inf]  copying path '/nix/store/c2njy6bv84kw1i4bjf5k5gn7gz8hn57n-xz-5.6.3' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.703083612Z [inf]  copying path '/nix/store/cqlaa2xf6lslnizyj9xqa8j0ii1yqw0x-zlib-1.3.1' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.713211732Z [inf]  copying path '/nix/store/nvvj6sk0k6px48436drlblf4gafgbvzr-gzip-1.13' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.713982238Z [inf]  copying path '/nix/store/df2a8k58k00f2dh2x930dg6xs6g6mliv-binutils-2.43.1-lib' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.719662939Z [inf]  copying path '/nix/store/c4rj90r2m89rxs64hmm857mipwjhig5d-file-5.46' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.72559317Z [inf]  copying path '/nix/store/2a3anh8vl3fcgk0fvaravlimrqawawza-libmpc-1.3.1' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.726352994Z [inf]  copying path '/nix/store/aap6cq56amx4mzbyxp2wpgsf1kqjcr1f-gnugrep-3.11' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.728017476Z [inf]  copying path '/nix/store/dj96qp9vps02l3n8xgc2vallqa9rhafb-sqlite-3.47.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.730633397Z [inf]  copying path '/nix/store/yc39wvfz87i0bl8r6vnhq48n6clbx2pb-sqlite-3.47.0-bin' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.732407097Z [inf]  copying path '/nix/store/nlqind4szw3amcmhgy4pd2n0894558gg-libX11-1.8.10' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.736193349Z [inf]  copying path '/nix/store/h18s640fnhhj2qdh5vivcfbxvz377srg-xz-5.6.3-bin' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.73920996Z [inf]  copying path '/nix/store/kj8hbqx4ds9qm9mq7hyikxyfwwg13kzj-glibc-2.40-36-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.739967853Z [inf]  copying path '/nix/store/1lggwqzapn5mn49l9zy4h566ysv9kzdb-zlib-1.3.1-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.802682149Z [inf]  copying path '/nix/store/i47d0rzbbnihcxkcaj48jgii5pj58djc-sqlite-3.47.0-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.845650823Z [inf]  copying path '/nix/store/r87iqz07igmwfvb12mgr6rmpb6353ys4-libXext-1.3.6' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.849771049Z [inf]  copying path '/nix/store/v9c1s50x7magpiqgycxxkn36avzbcg0g-krb5-1.21.3-lib' from 'https://cache.nixos.org'...
copying path '/nix/store/8675pnfr4fqnwv4pzjl67hdwls4q13aa-libssh2-1.11.1' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.849784309Z [inf]  copying path '/nix/store/qq5q0alyzywdazhmybi7m69akz0ppk05-openssl-3.3.2-bin' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.852498139Z [inf]  copying path '/nix/store/5mb70vg3kdzkyn0zqdgm4f87mdi0yi4i-libglvnd-1.7.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.852669389Z [inf]  copying path '/nix/store/j7p46r8v9gcpbxx89pbqlh61zhd33gzv-binutils-2.43.1' from 'https://cache.nixos.org'...
copying path '/nix/store/l89iqc7am6i60y8vk507zwrzxf0wcd3v-gcc-14-20241116' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.852808079Z [inf]  copying path '/nix/store/a2byxfv4lc8f2g5xfzw8cz5q8k05wi29-gmp-with-cxx-6.3.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.852858073Z [inf]  copying path '/nix/store/wwipgdqb4p2fr46kmw9c5wlk799kbl68-icu4c-74.2' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.852912536Z [inf]  copying path '/nix/store/srfxqk119fijwnprgsqvn68ys9kiw0bn-patchelf-0.15.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.87713995Z [inf]  copying path '/nix/store/4s9rah4cwaxflicsk5cndnknqlk9n4p3-coreutils-9.5' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.887160756Z [inf]  copying path '/nix/store/kqm7wpqkzc4bwjlzqizcbz0mgkj06a9x-openssl-3.3.2-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.889647876Z [inf]  copying path '/nix/store/lygl27c44xv73kx1spskcgvzwq7z337c-openssl-3.3.2-bin' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.919981419Z [inf]  copying path '/nix/store/pkc7mb4a4qvyz73srkqh4mwl70w98dsv-curl-8.11.0' from 'https://cache.nixos.org'...
copying path '/nix/store/milph81dilrh96isyivh5n50agpx39k2-krb5-1.21.3' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.942382033Z [inf]  copying path '/nix/store/00g69vw7c9lycy63h45ximy0wmzqx5y6-diffutils-3.10' from 'https://cache.nixos.org'...
copying path '/nix/store/jqrz1vq5nz4lnv9pqzydj0ir58wbjfy1-findutils-4.10.0' from 'https://cache.nixos.org'...
copying path '/nix/store/1i003ijlh9i0mzp6alqby5hg3090pjdx-perl-5.40.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.958506207Z [inf]  copying path '/nix/store/pp2zf8bdgyz60ds8vcshk2603gcjgp72-openssl-3.3.2-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:45.966743423Z [inf]  copying path '/nix/store/d7zhcrcc7q3yfbm3qkqpgc3daq82spwi-libssh2-1.11.1-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:46.321820904Z [inf]  copying path '/nix/store/srcmmqi8kxjfygd0hyy42c8hv6cws83b-binutils-wrapper-2.43.1' from 'https://cache.nixos.org'...

2025-09-05T09:47:46.569533529Z [inf]  copying path '/nix/store/m8w3mf0i4862q22bxad0wspkgdy4jnkk-icu4c-74.2-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:47.370193095Z [inf]  copying path '/nix/store/b56mswksrql15knpb1bnhv3ysif340kd-krb5-1.21.3-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:47.394667916Z [inf]  copying path '/nix/store/p123cq20klajcl9hj8jnkjip5nw6awhz-curl-8.11.0-bin' from 'https://cache.nixos.org'...

2025-09-05T09:47:48.027875043Z [inf]  copying path '/nix/store/4ig84cyqi6qy4n0sanrbzsw1ixa497jx-stdenv-linux' from 'https://cache.nixos.org'...

2025-09-05T09:47:48.379179588Z [inf]  building '/nix/store/l8kk1pz2miykkhlwl628qslhxx1lkc1m-libraries.drv'...

2025-09-05T09:47:48.385907797Z [inf]  copying path '/nix/store/5f5linrxzhhb3mrclkwdpm9bd8ygldna-curl-8.11.0-dev' from 'https://cache.nixos.org'...

2025-09-05T09:47:48.461751297Z [inf]  building '/nix/store/crmicnx1sb63i6q6md7i8vz9mxb5cair-pnpm-9.15.9.tgz.drv'...

2025-09-05T09:47:48.608366015Z [inf]  building '/nix/store/wbmzgs2l5v4fq166cfg80qqv1pypd1lv-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7-env.drv'...

2025-09-05T09:47:48.610721819Z [inf]  copying path '/nix/store/fkyp1bm5gll9adnfcj92snyym524mdrj-nodejs-22.11.0' from 'https://cache.nixos.org'...

2025-09-05T09:47:48.726726412Z [inf]  
trying https://registry.npmjs.org/pnpm/-/pnpm-9.15.9.tgz

2025-09-05T09:47:48.731450275Z [inf]    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

2025-09-05T09:47:48.731497571Z [inf]                                   Dload  Upload   Total   Spent    Left  Speed

2025-09-05T09:47:48.792431968Z [inf]  100 4210k  100 4210k    0     0  67.3M      0 --:--:-- --:--:-- --:--:-- 68.5M

2025-09-05T09:47:51.373513968Z [inf]  copying path '/nix/store/xcn9p4xxfbvlkpah7pwchpav4ab9d135-gcc-wrapper-14-20241116' from 'https://cache.nixos.org'...

2025-09-05T09:47:51.382352557Z [inf]  copying path '/nix/store/d0gfdcag8bxzvg7ww4s7px4lf8sxisyx-stdenv-linux' from 'https://cache.nixos.org'...

2025-09-05T09:47:51.425444642Z [inf]  building '/nix/store/39q7099jg9cxpbhan0w51gs7m1drhrwg-pnpm.drv'...

2025-09-05T09:47:51.489716127Z [inf]  Running phase: unpackPhase

2025-09-05T09:47:51.494680621Z [inf]  unpacking source archive /nix/store/f4glllk86xq0kygag8bljhnazpa5q6w2-pnpm-9.15.9.tgz

2025-09-05T09:47:51.613696255Z [inf]  source root is package

2025-09-05T09:47:51.635681923Z [inf]  setting SOURCE_DATE_EPOCH to timestamp 499162500 of file package/package.json

2025-09-05T09:47:51.640418972Z [inf]  Running phase: installPhase

2025-09-05T09:47:52.043427649Z [inf]  building '/nix/store/1v24l28yvkq5gamk83f6wvmka98y4zrw-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7-env.drv'...

2025-09-05T09:47:52.141932349Z [inf]  created 404 symlinks in user environment

2025-09-05T09:47:52.251104226Z [inf]  building '/nix/store/fkiyxdksi65cihkfs84nz5w2dyala4aq-user-environment.drv'...

2025-09-05T09:47:52.417750373Z [inf]  removing old generations of profile /nix/var/nix/profiles/per-user/root/channels

2025-09-05T09:47:52.41801436Z [inf]  removing old generations of profile /nix/var/nix/profiles/per-user/root/profile

2025-09-05T09:47:52.418068847Z [inf]  removing profile version 1

2025-09-05T09:47:52.418264589Z [inf]  removing old generations of profile /nix/var/nix/profiles/per-user/root/channels

2025-09-05T09:47:52.418326923Z [inf]  removing old generations of profile /nix/var/nix/profiles/per-user/root/profile

2025-09-05T09:47:52.420781707Z [inf]  finding garbage collector roots...

2025-09-05T09:47:52.421384692Z [inf]  removing stale link from '/nix/var/nix/gcroots/auto/lzjbmb2ry0z7lma2fvpqprb12921pnb5' to '/nix/var/nix/profiles/per-user/root/profile-1-link'

2025-09-05T09:47:52.426007576Z [inf]  deleting garbage...

2025-09-05T09:47:52.449330497Z [inf]  deleting '/nix/store/a9qf4wwhympzs35ncp80r185j6a21w07-user-environment'

2025-09-05T09:47:52.450209265Z [inf]  deleting '/nix/store/253kwn1730vnay87xkjgxa2v97w3y079-user-environment.drv'

2025-09-05T09:47:52.450499402Z [inf]  deleting '/nix/store/hn5mrh362n52x8wwab9s1v6bgn4n5c94-env-manifest.nix'

2025-09-05T09:47:52.451018642Z [inf]  deleting '/nix/store/5f5linrxzhhb3mrclkwdpm9bd8ygldna-curl-8.11.0-dev'

2025-09-05T09:47:52.452061649Z [inf]  deleting '/nix/store/p123cq20klajcl9hj8jnkjip5nw6awhz-curl-8.11.0-bin'

2025-09-05T09:47:52.452284788Z [inf]  deleting '/nix/store/pkc7mb4a4qvyz73srkqh4mwl70w98dsv-curl-8.11.0'

2025-09-05T09:47:52.452461801Z [inf]  deleting '/nix/store/b56mswksrql15knpb1bnhv3ysif340kd-krb5-1.21.3-dev'

2025-09-05T09:47:52.453259274Z [inf]  deleting '/nix/store/milph81dilrh96isyivh5n50agpx39k2-krb5-1.21.3'

2025-09-05T09:47:52.454064948Z [inf]  deleting '/nix/store/v9c1s50x7magpiqgycxxkn36avzbcg0g-krb5-1.21.3-lib'

2025-09-05T09:47:52.455410918Z [inf]  deleting '/nix/store/d0gfdcag8bxzvg7ww4s7px4lf8sxisyx-stdenv-linux'

2025-09-05T09:47:52.455829435Z [inf]  deleting '/nix/store/4ig84cyqi6qy4n0sanrbzsw1ixa497jx-stdenv-linux'

2025-09-05T09:47:52.45601512Z [inf]  deleting '/nix/store/nvvj6sk0k6px48436drlblf4gafgbvzr-gzip-1.13'

2025-09-05T09:47:52.456429061Z [inf]  deleting '/nix/store/c4rj90r2m89rxs64hmm857mipwjhig5d-file-5.46'

2025-09-05T09:47:52.456721179Z [inf]  deleting '/nix/store/na4c03201p0gmhn3bqr089x0xqia157w-source'

2025-09-05T09:47:52.458369898Z [inf]  deleting '/nix/store/mglixp03lsp0w986svwdvm7vcy17rdax-bzip2-1.0.8-bin'

2025-09-05T09:47:52.458659403Z [inf]  deleting '/nix/store/ivl2v8rgg7qh1jkj5pwpqycax3rc2hnl-bzip2-1.0.8'

2025-09-05T09:47:52.458909032Z [inf]  deleting '/nix/store/srfxqk119fijwnprgsqvn68ys9kiw0bn-patchelf-0.15.0'

2025-09-05T09:47:52.459434588Z [inf]  deleting '/nix/store/h18s640fnhhj2qdh5vivcfbxvz377srg-xz-5.6.3-bin'

2025-09-05T09:47:52.46014323Z [inf]  deleting '/nix/store/xcn9p4xxfbvlkpah7pwchpav4ab9d135-gcc-wrapper-14-20241116'

2025-09-05T09:47:52.461100768Z [inf]  deleting '/nix/store/srcmmqi8kxjfygd0hyy42c8hv6cws83b-binutils-wrapper-2.43.1'

2025-09-05T09:47:52.461522396Z [inf]  deleting '/nix/store/l89iqc7am6i60y8vk507zwrzxf0wcd3v-gcc-14-20241116'

2025-09-05T09:47:52.477234643Z [inf]  deleting '/nix/store/kj8hbqx4ds9qm9mq7hyikxyfwwg13kzj-glibc-2.40-36-dev'

2025-09-05T09:47:52.482330134Z [inf]  deleting '/nix/store/agvks3qmzja0yj54szi3vja6vx3cwkkw-curl-8.11.0-man'

2025-09-05T09:47:52.48260334Z [inf]  deleting '/nix/store/1i003ijlh9i0mzp6alqby5hg3090pjdx-perl-5.40.0'

2025-09-05T09:47:52.504289513Z [inf]  deleting '/nix/store/5yja5dpk2qw1v5mbfbl2d7klcdfrh90w-patch-2.7.6'

2025-09-05T09:47:52.504787282Z [inf]  deleting '/nix/store/d7zhcrcc7q3yfbm3qkqpgc3daq82spwi-libssh2-1.11.1-dev'

2025-09-05T09:47:52.505020124Z [inf]  deleting '/nix/store/kqm7wpqkzc4bwjlzqizcbz0mgkj06a9x-openssl-3.3.2-dev'

2025-09-05T09:47:52.506487197Z [inf]  deleting '/nix/store/xmbv8s4p4i4dbxgkgdrdfb0ym25wh6gk-isl-0.20'

2025-09-05T09:47:52.507399775Z [inf]  deleting '/nix/store/00g69vw7c9lycy63h45ximy0wmzqx5y6-diffutils-3.10'

2025-09-05T09:47:52.509745437Z [inf]  deleting '/nix/store/lwi59jcfwk2lnrakmm1y5vw85hj3n1bi-source'

2025-09-05T09:47:54.320657831Z [inf]  deleting '/nix/store/b5ada0c9y9cj43l0ccw56jc0l1sdkyrs-libraries'

2025-09-05T09:47:54.320778173Z [inf]  deleting '/nix/store/fv7gpnvg922frkh81w5hkdhpz0nw3iiz-mirrors-list'

2025-09-05T09:47:54.321068718Z [inf]  deleting '/nix/store/aap6cq56amx4mzbyxp2wpgsf1kqjcr1f-gnugrep-3.11'

2025-09-05T09:47:54.324355595Z [inf]  deleting '/nix/store/9cwwj1c9csmc85l2cqzs3h9hbf1vwl6c-gnutar-1.35'

2025-09-05T09:47:54.327187053Z [inf]  deleting '/nix/store/qbry6090vlr9ar33kdmmbq2p5apzbga8-expand-response-params'

2025-09-05T09:47:54.327407549Z [inf]  deleting '/nix/store/a3c47r5z1q2c4rz0kvq8hlilkhx2s718-gawk-5.3.1'

2025-09-05T09:47:54.329831002Z [inf]  deleting '/nix/store/d29r1bdmlvwmj52apgcdxfl1mm9c5782-update-autotools-gnu-config-scripts-hook'

2025-09-05T09:47:54.329939027Z [inf]  deleting '/nix/store/1m67ipsk39xvhyqrxnzv2m2p48pil8kl-gnu-config-2024-01-01'

2025-09-05T09:47:54.330251277Z [inf]  deleting '/nix/store/c2njy6bv84kw1i4bjf5k5gn7gz8hn57n-xz-5.6.3'

2025-09-05T09:47:54.332485373Z [inf]  deleting '/nix/store/j7p46r8v9gcpbxx89pbqlh61zhd33gzv-binutils-2.43.1'

2025-09-05T09:47:54.336425103Z [inf]  deleting '/nix/store/df2a8k58k00f2dh2x930dg6xs6g6mliv-binutils-2.43.1-lib'

2025-09-05T09:47:54.336934314Z [inf]  deleting '/nix/store/qq5q0alyzywdazhmybi7m69akz0ppk05-openssl-3.3.2-bin'

2025-09-05T09:47:54.337174563Z [inf]  deleting '/nix/store/8675pnfr4fqnwv4pzjl67hdwls4q13aa-libssh2-1.11.1'

2025-09-05T09:47:54.337444402Z [inf]  deleting '/nix/store/9l9n7a0v4aibcz0sgd0crs209an9p7dz-openssl-3.3.2'

2025-09-05T09:47:54.337973241Z [inf]  deleting '/nix/store/2wh1gqyzf5xsvxpdz2k0bxiz583wwq29-keyutils-1.6.3-lib'

2025-09-05T09:47:54.338278925Z [inf]  deleting '/nix/store/pc74azbkr19rkd5bjalq2xwx86cj3cga-linux-headers-6.12'

2025-09-05T09:47:54.348522659Z [inf]  deleting '/nix/store/fp6cjl1zcmm6mawsnrb5yak1wkz2ma8l-gnumake-4.4.1'

2025-09-05T09:47:54.350728681Z [inf]  deleting '/nix/store/2a3anh8vl3fcgk0fvaravlimrqawawza-libmpc-1.3.1'

2025-09-05T09:47:54.351030443Z [inf]  deleting '/nix/store/qs22aazzrdd4dnjf9vffl0n31hvls43h-mpfr-4.2.1'

2025-09-05T09:47:54.351418502Z [inf]  deleting '/nix/store/74h4z8k82pmp24xryflv4lxkz8jlpqqd-ed-1.20.2'

2025-09-05T09:47:54.351863053Z [inf]  deleting '/nix/store/3j1p598fivxs69wx3a657ysv3rw8k06l-pcre2-10.44'

2025-09-05T09:47:54.352437907Z [inf]  deleting '/nix/store/dz97fw51rm5bl9kz1vg0haj1j1a7r1mr-nghttp2-1.64.0-dev'

2025-09-05T09:47:54.352761535Z [inf]  deleting '/nix/store/qcghigzrz56vczwlzg9c02vbs6zr9jkz-nghttp2-1.64.0-lib'

2025-09-05T09:47:54.353268409Z [inf]  deleting '/nix/store/kryrg7ds05iwcmy81amavk8w13y4lxbs-gmp-6.3.0'

2025-09-05T09:47:54.353534303Z [inf]  deleting '/nix/store/wf5zj2gbib3gjqllkabxaw4dh0gzcla3-builder.pl'

2025-09-05T09:47:54.353739661Z [inf]  deleting '/nix/store/abm77lnrkrkb58z6xp1qwjcr1xgkcfwm-gnused-4.9'

2025-09-05T09:47:54.35644743Z [inf]  deleting '/nix/store/6cr0spsvymmrp1hj5n0kbaxw55w1lqyp-libxcrypt-4.4.36'

2025-09-05T09:47:54.356812859Z [inf]  deleting '/nix/store/jqrz1vq5nz4lnv9pqzydj0ir58wbjfy1-findutils-4.10.0'

2025-09-05T09:47:54.360196388Z [inf]  deleting '/nix/store/1c6bmxrrhm8bd26ai2rjqld2yyjrxhds-glibc-2.40-36-bin'

2025-09-05T09:47:54.36071395Z [inf]  deleting '/nix/store/f4glllk86xq0kygag8bljhnazpa5q6w2-pnpm-9.15.9.tgz'

2025-09-05T09:47:54.361040923Z [inf]  deleting '/nix/store/grixvx878884hy8x3xs0c0s1i00j632k-nghttp2-1.64.0'

2025-09-05T09:47:54.361225412Z [inf]  deleting unused links...

2025-09-05T09:47:56.230054038Z [inf]  note: currently hard linking saves 3.13 MiB

2025-09-05T09:47:56.291905304Z [inf]  61 store paths deleted, 560.90 MiB freed

2025-09-05T09:47:56.532046136Z [inf]  [stage-0  4/12] RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix && nix-collect-garbage -d
2025-09-05T09:47:56.539922705Z [inf]  [stage-0  5/12] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2t64 libpangocairo-1.0-0 libxss1 libgtk-3-0 libxshmfence1 libglu1 chromium
2025-09-05T09:47:57.249847643Z [inf]  Get:1 http://archive.ubuntu.com/ubuntu noble InRelease [256 kB]

2025-09-05T09:47:57.665758947Z [inf]  Get:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]

2025-09-05T09:47:57.769575834Z [inf]  Get:3 http://archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]

2025-09-05T09:47:57.873453857Z [inf]  Get:4 http://archive.ubuntu.com/ubuntu noble/restricted amd64 Packages [117 kB]

2025-09-05T09:47:57.905770578Z [inf]  Get:5 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages [19.3 MB]

2025-09-05T09:47:58.610105046Z [inf]  Get:6 http://archive.ubuntu.com/ubuntu noble/main amd64 Packages [1808 kB]

2025-09-05T09:47:58.652473139Z [inf]  Get:7 http://archive.ubuntu.com/ubuntu noble/multiverse amd64 Packages [331 kB]

2025-09-05T09:47:58.660482527Z [inf]  Get:8 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages [1760 kB]

2025-09-05T09:47:58.703925365Z [inf]  Get:9 http://archive.ubuntu.com/ubuntu noble-updates/restricted amd64 Packages [2269 kB]

2025-09-05T09:47:58.758266381Z [inf]  Get:10 http://archive.ubuntu.com/ubuntu noble-updates/universe amd64 Packages [1918 kB]

2025-09-05T09:47:58.805641097Z [inf]  Get:11 http://archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Packages [45.2 kB]

2025-09-05T09:47:59.044607034Z [inf]  Get:12 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]

2025-09-05T09:47:59.481525385Z [inf]  Get:13 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Packages [2159 kB]

2025-09-05T09:48:00.381938113Z [inf]  Get:14 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages [1408 kB]

2025-09-05T09:48:00.67498077Z [inf]  Get:15 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Packages [1135 kB]

2025-09-05T09:48:00.798701692Z [inf]  Get:16 http://security.ubuntu.com/ubuntu noble-security/multiverse amd64 Packages [23.0 kB]

2025-09-05T09:48:30.917566159Z [inf]  Get:17 http://archive.ubuntu.com/ubuntu noble-backports/main amd64 Packages [48.8 kB]

2025-09-05T09:48:31.172957211Z [inf]  Get:18 http://archive.ubuntu.com/ubuntu noble-backports/universe amd64 Packages [35.6 kB]

2025-09-05T09:48:31.24293592Z [inf]  Fetched 33.0 MB in 34s (959 kB/s)
Reading package lists...
2025-09-05T09:48:32.118581688Z [inf]  

2025-09-05T09:48:32.154038786Z [inf]  Reading package lists...
2025-09-05T09:48:33.036470266Z [inf]  

2025-09-05T09:48:33.052801342Z [inf]  Building dependency tree...
2025-09-05T09:48:33.236729402Z [inf]  
Reading state information...
2025-09-05T09:48:33.237012123Z [inf]  

2025-09-05T09:48:33.452081744Z [inf]  The following additional packages will be installed:
  adduser adwaita-icon-theme apparmor at-spi2-common bsdutils dbus dbus-bin
  dbus-daemon dbus-session-bus-common dbus-system-bus-common dbus-user-session

2025-09-05T09:48:33.45216769Z [inf]    dconf-gsettings-backend dconf-service fontconfig fontconfig-config

2025-09-05T09:48:33.452330523Z [inf]    fonts-dejavu-core fonts-dejavu-mono fuse3 gtk-update-icon-cache

2025-09-05T09:48:33.452457744Z [inf]    hicolor-icon-theme humanity-icon-theme libapparmor1 libargon2-1

2025-09-05T09:48:33.45248095Z [inf]    libasound2-data libatspi2.0-0t64 libavahi-client3 libavahi-common-data

2025-09-05T09:48:33.452586872Z [inf]    libavahi-common3 libblkid1 libbsd0 libcairo-gobject2 libcairo2 libcbor0.10
  libcolord2 libcryptsetup12 libdatrie1 libdbus-1-3 libdconf1 libdeflate0
  libdevmapper1.02.1 libdrm-amdgpu1 libdrm-common libdrm-intel1 libdrm2
  libedit2 libelf1t64 libepoxy0 libfdisk1 libfido2-1 libfontconfig1
  libfreetype6 libfribidi0 libfuse3-3 libgdk-pixbuf-2.0-0

2025-09-05T09:48:33.452665581Z [inf]    libgdk-pixbuf2.0-common libglib2.0-0t64 libglvnd0 libgraphite2-3

2025-09-05T09:48:33.452701311Z [inf]    libgtk-3-common libharfbuzz0b libicu74 libjbig0 libjpeg-turbo8 libjpeg8

2025-09-05T09:48:33.452783268Z [inf]    libjson-c5 libkmod2 liblcms2-2 liblerc4 libllvm20 liblzo2-2 libmount1

2025-09-05T09:48:33.452806299Z [inf]    libnspr4 libopengl0 libpam-systemd libpango-1.0-0 libpangoft2-1.0-0

2025-09-05T09:48:33.453301185Z [inf]    libpciaccess0 libpixman-1-0 libpng16-16t64 libsensors-config libsensors5

2025-09-05T09:48:33.453375823Z [inf]    libsharpyuv0 libsmartcols1 libsqlite3-0 libsystemd-shared libsystemd0

2025-09-05T09:48:33.453432411Z [inf]    libthai-data libthai0 libtiff6 libudev1 libuuid1 libwayland-client0
  libwayland-cursor0 libwayland-egl1 libwayland-server0 libwebp7 libx11-6
  libx11-data libx11-xcb1 libxau6 libxcb-dri3-0 libxcb-present0 libxcb-randr0
  libxcb-render0 libxcb-shm0 libxcb-sync1 libxcb-xfixes0 libxcb1
  libxcomposite1 libxcursor1 libxdamage1 libxdmcp6 libxext6 libxfixes3 libxi6

2025-09-05T09:48:33.453730103Z [inf]    libxinerama1 libxkbcommon0 libxml2 libxrandr2 libxrender1 mesa-libgallium

2025-09-05T09:48:33.454141553Z [inf]    mount openssh-client shared-mime-info snapd squashfs-tools systemd

2025-09-05T09:48:33.454206052Z [inf]    systemd-dev systemd-sysv ubuntu-mono udev util-linux x11-common xkb-data

2025-09-05T09:48:33.455730913Z [inf]  Suggested packages:
  liblocale-gettext-perl cron quota ecryptfs-utils apparmor-profiles-extra
  apparmor-utils alsa-utils libasound2-plugins colord cups-common
  low-memory-monitor gvfs liblcms2-utils cryptsetup-bin pciutils lm-sensors
  nfs-common keychain libpam-ssh monkeysphere ssh-askpass zenity | kdialog
  systemd-container systemd-homed systemd-userdbd systemd-boot libip4tc2
  libqrencode4 libtss2-esys-3.0.2-0 libtss2-mu-4.0.1-0 libtss2-rc0
  libtss2-tcti-device0 polkitd dosfstools kbd util-linux-extra
  util-linux-locales
Recommended packages:
  librsvg2-common bsdextrautils alsa-ucm-conf alsa-topology-conf at-spi2-core
  dmsetup libgdk-pixbuf2.0-bin libglib2.0-data xdg-user-dirs libgtk-3-bin
  uuid-runtime xauth gnupg networkd-dispatcher systemd-timesyncd | time-daemon
  systemd-resolved libnss-systemd systemd-hwe-hwdb

2025-09-05T09:48:33.586082641Z [inf]  The following NEW packages will be installed:

2025-09-05T09:48:33.586161944Z [inf]    adduser adwaita-icon-theme apparmor at-spi2-common chromium-browser dbus
  dbus-bin dbus-daemon dbus-session-bus-common dbus-system-bus-common

2025-09-05T09:48:33.586219771Z [inf]    dbus-user-session dconf-gsettings-backend dconf-service fontconfig

2025-09-05T09:48:33.586429605Z [inf]    fontconfig-config fonts-dejavu-core fonts-dejavu-mono fuse3

2025-09-05T09:48:33.58661003Z [inf]    gtk-update-icon-cache hicolor-icon-theme humanity-icon-theme libargon2-1
  libasound2-data libasound2t64 libatk-bridge2.0-0t64 libatk1.0-0t64
  libatspi2.0-0t64 libavahi-client3 libavahi-common-data libavahi-common3

2025-09-05T09:48:33.586681243Z [inf]    libbsd0 libcairo-gobject2 libcairo2 libcbor0.10 libcolord2 libcryptsetup12
  libcups2t64 libdatrie1 libdbus-1-3 libdconf1 libdeflate0 libdevmapper1.02.1
  libdrm-amdgpu1 libdrm-common libdrm-intel1 libdrm2 libedit2 libelf1t64

2025-09-05T09:48:33.586732806Z [inf]    libepoxy0 libfdisk1 libfido2-1 libfontconfig1 libfreetype6 libfribidi0

2025-09-05T09:48:33.586834488Z [inf]    libfuse3-3 libgbm1 libgdk-pixbuf-2.0-0 libgdk-pixbuf2.0-common

2025-09-05T09:48:33.586863332Z [inf]    libglib2.0-0t64 libglu1-mesa libglvnd0 libgraphite2-3 libgtk-3-0t64

2025-09-05T09:48:33.586913201Z [inf]    libgtk-3-common libharfbuzz0b libicu74 libjbig0 libjpeg-turbo8 libjpeg8

2025-09-05T09:48:33.587125279Z [inf]    libjson-c5 libkmod2 liblcms2-2 liblerc4 libllvm20 liblzo2-2 libnspr4 libnss3
  libopengl0 libpam-systemd libpango-1.0-0 libpangocairo-1.0-0

2025-09-05T09:48:33.587830264Z [inf]    libpangoft2-1.0-0 libpciaccess0 libpixman-1-0 libpng16-16t64

2025-09-05T09:48:33.587909563Z [inf]    libsensors-config libsensors5 libsharpyuv0 libsqlite3-0 libsystemd-shared

2025-09-05T09:48:33.587964778Z [inf]    libthai-data libthai0 libtiff6 libwayland-client0 libwayland-cursor0
  libwayland-egl1 libwayland-server0 libwebp7 libx11-6 libx11-data libx11-xcb1

2025-09-05T09:48:33.587975749Z [inf]    libxau6 libxcb-dri3-0 libxcb-present0 libxcb-randr0 libxcb-render0
  libxcb-shm0 libxcb-sync1 libxcb-xfixes0 libxcb1 libxcomposite1 libxcursor1

2025-09-05T09:48:33.587998504Z [inf]    libxdamage1 libxdmcp6 libxext6 libxfixes3 libxi6 libxinerama1 libxkbcommon0

2025-09-05T09:48:33.588594139Z [inf]    libxml2 libxrandr2 libxrender1 libxshmfence1 libxss1 mesa-libgallium

2025-09-05T09:48:33.589106487Z [inf]    openssh-client shared-mime-info snapd squashfs-tools systemd systemd-dev

2025-09-05T09:48:33.589198437Z [inf]    systemd-sysv ubuntu-mono udev x11-common xkb-data

2025-09-05T09:48:33.590237019Z [inf]  The following packages will be upgraded:

2025-09-05T09:48:33.591291993Z [inf]    bsdutils libapparmor1 libblkid1 libmount1 libsmartcols1 libsystemd0 libudev1

2025-09-05T09:48:33.591973998Z [inf]    libuuid1 mount util-linux

2025-09-05T09:48:35.293053039Z [inf]  10 upgraded, 136 newly installed, 0 to remove and 26 not upgraded.
Need to get 118 MB of archives.
After this operation, 491 MB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 bsdutils amd64 1:2.39.3-9ubuntu6.3 [95.9 kB]

2025-09-05T09:48:35.622140048Z [inf]  Get:2 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 util-linux amd64 2.39.3-9ubuntu6.3 [1128 kB]

2025-09-05T09:48:36.679688396Z [inf]  Get:3 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 mount amd64 2.39.3-9ubuntu6.3 [118 kB]

2025-09-05T09:48:36.777293758Z [inf]  Get:4 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libapparmor1 amd64 4.0.1really4.0.1-0ubuntu0.24.04.4 [50.6 kB]

2025-09-05T09:48:36.824179413Z [inf]  Get:5 http://archive.ubuntu.com/ubuntu noble/main amd64 libargon2-1 amd64 0~20190702+dfsg-4build1 [20.8 kB]

2025-09-05T09:48:36.851182866Z [inf]  Get:6 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libblkid1 amd64 2.39.3-9ubuntu6.3 [123 kB]

2025-09-05T09:48:36.951200786Z [inf]  Get:7 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libudev1 amd64 255.4-1ubuntu8.10 [176 kB]

2025-09-05T09:48:37.097845815Z [inf]  Get:8 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libdevmapper1.02.1 amd64 2:1.02.185-3ubuntu3.2 [139 kB]

2025-09-05T09:48:37.223027113Z [inf]  Get:9 http://archive.ubuntu.com/ubuntu noble/main amd64 libjson-c5 amd64 0.17-1build1 [35.3 kB]

2025-09-05T09:48:37.249870511Z [inf]  Get:10 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libuuid1 amd64 2.39.3-9ubuntu6.3 [35.8 kB]

2025-09-05T09:48:37.288963268Z [inf]  Get:11 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libcryptsetup12 amd64 2:2.7.0-1ubuntu4.2 [266 kB]

2025-09-05T09:48:38.726029802Z [inf]  Get:12 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libfdisk1 amd64 2.39.3-9ubuntu6.3 [146 kB]

2025-09-05T09:48:39.125898468Z [inf]  Get:13 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libkmod2 amd64 31+20240202-2ubuntu7.1 [51.7 kB]

2025-09-05T09:48:39.163549742Z [inf]  Get:14 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libmount1 amd64 2.39.3-9ubuntu6.3 [134 kB]

2025-09-05T09:48:39.304066374Z [inf]  Get:15 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libsystemd-shared amd64 255.4-1ubuntu8.10 [2074 kB]

2025-09-05T09:48:41.818956194Z [inf]  Get:16 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libsystemd0 amd64 255.4-1ubuntu8.10 [434 kB]

2025-09-05T09:48:42.362265248Z [inf]  Get:17 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 systemd-dev all 255.4-1ubuntu8.10 [105 kB]

2025-09-05T09:48:42.520922581Z [inf]  Get:18 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 systemd amd64 255.4-1ubuntu8.10 [3475 kB]

2025-09-05T09:48:47.460668756Z [inf]  Get:19 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 systemd-sysv amd64 255.4-1ubuntu8.10 [11.9 kB]

2025-09-05T09:48:47.474691924Z [inf]  Get:20 http://archive.ubuntu.com/ubuntu noble/main amd64 adduser all 3.137ubuntu1 [101 kB]

2025-09-05T09:48:47.595098449Z [inf]  Get:21 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 apparmor amd64 4.0.1really4.0.1-0ubuntu0.24.04.4 [637 kB]

2025-09-05T09:48:48.38989031Z [inf]  Get:22 http://archive.ubuntu.com/ubuntu noble/main amd64 libfuse3-3 amd64 3.14.0-5build1 [83.1 kB]

2025-09-05T09:48:50.557465733Z [inf]  Get:23 http://archive.ubuntu.com/ubuntu noble/main amd64 fuse3 amd64 3.14.0-5build1 [25.2 kB]

2025-09-05T09:48:50.745880339Z [inf]  Get:24 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libbsd0 amd64 0.12.1-1build1.1 [41.2 kB]

2025-09-05T09:48:50.832934309Z [inf]  Get:25 http://archive.ubuntu.com/ubuntu noble/main amd64 libedit2 amd64 3.1-20230828-1build1 [97.6 kB]

2025-09-05T09:48:51.408320355Z [inf]  Get:26 http://archive.ubuntu.com/ubuntu noble/main amd64 libcbor0.10 amd64 0.10.2-1.2ubuntu2 [25.8 kB]

2025-09-05T09:48:51.473738865Z [inf]  Get:27 http://archive.ubuntu.com/ubuntu noble/main amd64 libfido2-1 amd64 1.14.0-1build3 [83.5 kB]

2025-09-05T09:48:51.667291993Z [inf]  Get:28 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 openssh-client amd64 1:9.6p1-3ubuntu13.13 [906 kB]

2025-09-05T09:48:53.953241766Z [inf]  Get:29 http://archive.ubuntu.com/ubuntu noble/main amd64 liblzo2-2 amd64 2.10-2build4 [54.1 kB]

2025-09-05T09:48:54.085830839Z [inf]  Get:30 http://archive.ubuntu.com/ubuntu noble/main amd64 squashfs-tools amd64 1:4.6.1-1build1 [189 kB]

2025-09-05T09:48:54.498526061Z [inf]  Get:31 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 udev amd64 255.4-1ubuntu8.10 [1873 kB]

2025-09-05T09:48:58.904069668Z [inf]  Get:32 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libdbus-1-3 amd64 1.14.10-4ubuntu4.1 [210 kB]

2025-09-05T09:48:59.37948466Z [inf]  Get:33 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 dbus-bin amd64 1.14.10-4ubuntu4.1 [39.3 kB]

2025-09-05T09:48:59.637519277Z [inf]  Get:34 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 dbus-session-bus-common all 1.14.10-4ubuntu4.1 [80.5 kB]

2025-09-05T09:48:59.938613128Z [inf]  Get:35 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 dbus-daemon amd64 1.14.10-4ubuntu4.1 [118 kB]

2025-09-05T09:49:00.4465621Z [inf]  Get:36 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 dbus-system-bus-common all 1.14.10-4ubuntu4.1 [81.6 kB]

2025-09-05T09:49:00.581601435Z [inf]  Get:37 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 dbus amd64 1.14.10-4ubuntu4.1 [24.3 kB]

2025-09-05T09:49:00.61740146Z [inf]  Get:38 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libpam-systemd amd64 255.4-1ubuntu8.10 [235 kB]

2025-09-05T09:49:00.875607201Z [inf]  Get:39 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 dbus-user-session amd64 1.14.10-4ubuntu4.1 [9968 B]

2025-09-05T09:49:00.884442583Z [inf]  Get:40 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 snapd amd64 2.68.5+ubuntu24.04.1 [32.3 MB]

2025-09-05T09:49:03.534419464Z [inf]  Get:41 http://archive.ubuntu.com/ubuntu noble/universe amd64 chromium-browser amd64 2:1snap1-0ubuntu2 [50.0 kB]

2025-09-05T09:49:03.53491925Z [inf]  Get:42 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libsmartcols1 amd64 2.39.3-9ubuntu6.3 [65.4 kB]

2025-09-05T09:49:03.535650892Z [inf]  Get:43 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libelf1t64 amd64 0.190-1.1ubuntu0.1 [57.8 kB]

2025-09-05T09:49:03.536318055Z [inf]  Get:44 http://archive.ubuntu.com/ubuntu noble/main amd64 libfribidi0 amd64 1.0.13-3build1 [26.1 kB]

2025-09-05T09:49:04.948192319Z [inf]  Get:45 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libglib2.0-0t64 amd64 2.80.0-6ubuntu3.4 [1544 kB]

2025-09-05T09:49:05.590734055Z [inf]  Get:46 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libicu74 amd64 74.2-1ubuntu3.1 [10.9 MB]

2025-09-05T09:49:06.29734996Z [inf]  Get:47 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libsqlite3-0 amd64 3.45.1-1ubuntu2.4 [701 kB]

2025-09-05T09:49:06.30671289Z [inf]  Get:48 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libxml2 amd64 2.9.14+dfsg-1.3ubuntu3.4 [762 kB]

2025-09-05T09:49:06.3489137Z [inf]  Get:49 http://archive.ubuntu.com/ubuntu noble/main amd64 shared-mime-info amd64 2.4-4 [474 kB]

2025-09-05T09:49:06.355448252Z [inf]  Get:50 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 xkb-data all 2.41-2ubuntu1.1 [397 kB]

2025-09-05T09:49:06.360978052Z [inf]  Get:51 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libdrm-common all 2.4.122-1~ubuntu0.24.04.1 [8406 B]

2025-09-05T09:49:06.361362695Z [inf]  Get:52 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libdrm2 amd64 2.4.122-1~ubuntu0.24.04.1 [40.6 kB]

2025-09-05T09:49:06.361874023Z [inf]  Get:53 http://archive.ubuntu.com/ubuntu noble/main amd64 libpng16-16t64 amd64 1.6.43-5build1 [187 kB]

2025-09-05T09:49:06.364639768Z [inf]  Get:54 http://archive.ubuntu.com/ubuntu noble/main amd64 libsensors-config all 1:3.6.0-9build1 [5546 B]

2025-09-05T09:49:06.36494974Z [inf]  Get:55 http://archive.ubuntu.com/ubuntu noble/main amd64 libsensors5 amd64 1:3.6.0-9build1 [26.6 kB]

2025-09-05T09:49:06.850246439Z [inf]  Get:56 http://archive.ubuntu.com/ubuntu noble/main amd64 libxau6 amd64 1:1.0.9-1build6 [7160 B]

2025-09-05T09:49:06.926558457Z [inf]  Get:57 http://archive.ubuntu.com/ubuntu noble/main amd64 libxdmcp6 amd64 1:1.1.3-0ubuntu6 [10.3 kB]

2025-09-05T09:49:06.943211049Z [inf]  Get:58 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb1 amd64 1.15-1ubuntu2 [47.7 kB]

2025-09-05T09:49:07.077243297Z [inf]  Get:59 http://archive.ubuntu.com/ubuntu noble/main amd64 libx11-data all 2:1.8.7-1build1 [115 kB]

2025-09-05T09:49:07.19403004Z [inf]  Get:60 http://archive.ubuntu.com/ubuntu noble/main amd64 libx11-6 amd64 2:1.8.7-1build1 [650 kB]

2025-09-05T09:49:07.364089758Z [inf]  Get:61 http://archive.ubuntu.com/ubuntu noble/main amd64 libxext6 amd64 2:1.3.4-1build2 [30.4 kB]

2025-09-05T09:49:07.368525406Z [inf]  Get:62 http://archive.ubuntu.com/ubuntu noble/main amd64 libxkbcommon0 amd64 1.6.0-1build1 [122 kB]

2025-09-05T09:49:07.383823261Z [inf]  Get:63 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libgdk-pixbuf2.0-common all 2.42.10+dfsg-3ubuntu3.2 [8192 B]

2025-09-05T09:49:07.384203797Z [inf]  Get:64 http://archive.ubuntu.com/ubuntu noble/main amd64 libjpeg-turbo8 amd64 2.1.5-2ubuntu2 [150 kB]

2025-09-05T09:49:07.399558518Z [inf]  Get:65 http://archive.ubuntu.com/ubuntu noble/main amd64 libjpeg8 amd64 8c-2ubuntu11 [2148 B]

2025-09-05T09:49:07.399623257Z [inf]  Get:66 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libdeflate0 amd64 1.19-1build1.1 [43.9 kB]

2025-09-05T09:49:07.807066138Z [inf]  Get:67 http://archive.ubuntu.com/ubuntu noble/main amd64 libjbig0 amd64 2.1-6.1ubuntu2 [29.7 kB]

2025-09-05T09:49:07.988541693Z [inf]  Get:68 http://archive.ubuntu.com/ubuntu noble/main amd64 liblerc4 amd64 4.0.0+ds-4ubuntu2 [179 kB]

2025-09-05T09:49:08.198638156Z [inf]  Get:69 http://archive.ubuntu.com/ubuntu noble/main amd64 libsharpyuv0 amd64 1.3.2-0.4build3 [15.8 kB]

2025-09-05T09:49:08.209353421Z [inf]  Get:70 http://archive.ubuntu.com/ubuntu noble/main amd64 libwebp7 amd64 1.3.2-0.4build3 [230 kB]

2025-09-05T09:49:08.292260171Z [inf]  Get:71 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libtiff6 amd64 4.5.1+git230720-4ubuntu2.3 [199 kB]

2025-09-05T09:49:08.333181311Z [inf]  Get:72 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libgdk-pixbuf-2.0-0 amd64 2.42.10+dfsg-3ubuntu3.2 [147 kB]

2025-09-05T09:49:08.356968649Z [inf]  Get:73 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 gtk-update-icon-cache amd64 3.24.41-4ubuntu1.3 [51.9 kB]

2025-09-05T09:49:08.364440863Z [inf]  Get:74 http://archive.ubuntu.com/ubuntu noble/main amd64 hicolor-icon-theme all 0.17-2 [9976 B]

2025-09-05T09:49:08.365396826Z [inf]  Get:75 http://archive.ubuntu.com/ubuntu noble/main amd64 humanity-icon-theme all 0.6.16 [1282 kB]

2025-09-05T09:49:08.465299977Z [inf]  Get:76 http://archive.ubuntu.com/ubuntu noble/main amd64 ubuntu-mono all 24.04-0ubuntu1 [151 kB]

2025-09-05T09:49:08.472901464Z [inf]  Get:77 http://archive.ubuntu.com/ubuntu noble/main amd64 adwaita-icon-theme all 46.0-1 [723 kB]

2025-09-05T09:49:08.906904138Z [inf]  Get:78 http://archive.ubuntu.com/ubuntu noble/main amd64 at-spi2-common all 2.52.0-1build1 [8674 B]

2025-09-05T09:49:08.984107487Z [inf]  Get:79 http://archive.ubuntu.com/ubuntu noble/main amd64 libdconf1 amd64 0.40.0-4build2 [39.4 kB]

2025-09-05T09:49:09.08689553Z [inf]  Get:80 http://archive.ubuntu.com/ubuntu noble/main amd64 dconf-service amd64 0.40.0-4build2 [27.5 kB]

2025-09-05T09:49:09.136369959Z [inf]  Get:81 http://archive.ubuntu.com/ubuntu noble/main amd64 dconf-gsettings-backend amd64 0.40.0-4build2 [22.1 kB]

2025-09-05T09:49:09.163160291Z [inf]  Get:82 http://archive.ubuntu.com/ubuntu noble/main amd64 libfreetype6 amd64 2.13.2+dfsg-1build3 [402 kB]

2025-09-05T09:49:09.354052843Z [inf]  Get:83 http://archive.ubuntu.com/ubuntu noble/main amd64 fonts-dejavu-mono all 2.37-8 [502 kB]

2025-09-05T09:49:09.433004181Z [inf]  Get:84 http://archive.ubuntu.com/ubuntu noble/main amd64 fonts-dejavu-core all 2.37-8 [835 kB]

2025-09-05T09:49:09.499036238Z [inf]  Get:85 http://archive.ubuntu.com/ubuntu noble/main amd64 fontconfig-config amd64 2.15.0-1.1ubuntu2 [37.3 kB]

2025-09-05T09:49:09.500859151Z [inf]  Get:86 http://archive.ubuntu.com/ubuntu noble/main amd64 libfontconfig1 amd64 2.15.0-1.1ubuntu2 [139 kB]

2025-09-05T09:49:09.509004232Z [inf]  Get:87 http://archive.ubuntu.com/ubuntu noble/main amd64 fontconfig amd64 2.15.0-1.1ubuntu2 [180 kB]

2025-09-05T09:49:09.518522047Z [inf]  Get:88 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libasound2-data all 1.2.11-1ubuntu0.1 [21.1 kB]

2025-09-05T09:49:09.922414425Z [inf]  Get:89 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libasound2t64 amd64 1.2.11-1ubuntu0.1 [399 kB]

2025-09-05T09:49:10.393164834Z [inf]  Get:90 http://archive.ubuntu.com/ubuntu noble/main amd64 libatk1.0-0t64 amd64 2.52.0-1build1 [55.3 kB]

2025-09-05T09:49:10.400051129Z [inf]  Get:91 http://archive.ubuntu.com/ubuntu noble/main amd64 libxi6 amd64 2:1.8.1-1build1 [32.4 kB]

2025-09-05T09:49:10.404719025Z [inf]  Get:92 http://archive.ubuntu.com/ubuntu noble/main amd64 libatspi2.0-0t64 amd64 2.52.0-1build1 [80.5 kB]

2025-09-05T09:49:10.415787891Z [inf]  Get:93 http://archive.ubuntu.com/ubuntu noble/main amd64 libatk-bridge2.0-0t64 amd64 2.52.0-1build1 [66.0 kB]

2025-09-05T09:49:10.470695182Z [inf]  Get:94 http://archive.ubuntu.com/ubuntu noble/main amd64 libavahi-common-data amd64 0.8-13ubuntu6 [29.7 kB]

2025-09-05T09:49:10.475498444Z [inf]  Get:95 http://archive.ubuntu.com/ubuntu noble/main amd64 libavahi-common3 amd64 0.8-13ubuntu6 [23.3 kB]

2025-09-05T09:49:10.47845401Z [inf]  Get:96 http://archive.ubuntu.com/ubuntu noble/main amd64 libavahi-client3 amd64 0.8-13ubuntu6 [26.8 kB]

2025-09-05T09:49:10.481510788Z [inf]  Get:97 http://archive.ubuntu.com/ubuntu noble/main amd64 libpixman-1-0 amd64 0.42.2-1build1 [279 kB]

2025-09-05T09:49:10.541262318Z [inf]  Get:98 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb-render0 amd64 1.15-1ubuntu2 [16.2 kB]

2025-09-05T09:49:10.544145865Z [inf]  Get:99 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb-shm0 amd64 1.15-1ubuntu2 [5756 B]

2025-09-05T09:49:10.947625917Z [inf]  Get:100 http://archive.ubuntu.com/ubuntu noble/main amd64 libxrender1 amd64 1:0.9.10-1.1build1 [19.0 kB]

2025-09-05T09:49:11.107794132Z [inf]  Get:101 http://archive.ubuntu.com/ubuntu noble/main amd64 libcairo2 amd64 1.18.0-3build1 [566 kB]

2025-09-05T09:49:11.467263944Z [inf]  Get:102 http://archive.ubuntu.com/ubuntu noble/main amd64 libcairo-gobject2 amd64 1.18.0-3build1 [127 kB]

2025-09-05T09:49:11.48944016Z [inf]  Get:103 http://archive.ubuntu.com/ubuntu noble/main amd64 liblcms2-2 amd64 2.14-2build1 [161 kB]

2025-09-05T09:49:11.5113924Z [inf]  Get:104 http://archive.ubuntu.com/ubuntu noble/main amd64 libcolord2 amd64 1.4.7-1build2 [149 kB]

2025-09-05T09:49:11.527614455Z [inf]  Get:105 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libcups2t64 amd64 2.4.7-1.2ubuntu7.3 [272 kB]

2025-09-05T09:49:11.554327074Z [inf]  Get:106 http://archive.ubuntu.com/ubuntu noble/main amd64 libdatrie1 amd64 0.2.13-3build1 [19.0 kB]

2025-09-05T09:49:11.555924643Z [inf]  Get:107 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libdrm-amdgpu1 amd64 2.4.122-1~ubuntu0.24.04.1 [20.7 kB]

2025-09-05T09:49:11.557140502Z [inf]  Get:108 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libpciaccess0 amd64 0.17-3ubuntu0.24.04.2 [18.9 kB]

2025-09-05T09:49:11.559044417Z [inf]  Get:109 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libdrm-intel1 amd64 2.4.122-1~ubuntu0.24.04.1 [63.8 kB]

2025-09-05T09:49:11.564539164Z [inf]  Get:110 http://archive.ubuntu.com/ubuntu noble/main amd64 libepoxy0 amd64 1.5.10-1build1 [220 kB]

2025-09-05T09:49:11.983974682Z [inf]  Get:111 http://archive.ubuntu.com/ubuntu noble/main amd64 libwayland-server0 amd64 1.22.0-2.1build1 [33.9 kB]

2025-09-05T09:49:12.179594772Z [inf]  Get:112 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libllvm20 amd64 1:20.1.2-0ubuntu1~24.04.2 [30.6 MB]

2025-09-05T09:49:13.401909995Z [inf]  Get:113 http://archive.ubuntu.com/ubuntu noble/main amd64 libx11-xcb1 amd64 2:1.8.7-1build1 [7800 B]
Get:114 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb-dri3-0 amd64 1.15-1ubuntu2 [7142 B]

2025-09-05T09:49:13.402264577Z [inf]  Get:115 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb-present0 amd64 1.15-1ubuntu2 [5676 B]

2025-09-05T09:49:13.402580408Z [inf]  Get:116 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb-randr0 amd64 1.15-1ubuntu2 [17.9 kB]

2025-09-05T09:49:13.402850937Z [inf]  Get:117 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb-sync1 amd64 1.15-1ubuntu2 [9312 B]

2025-09-05T09:49:13.403079768Z [inf]  Get:118 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcb-xfixes0 amd64 1.15-1ubuntu2 [10.2 kB]

2025-09-05T09:49:13.403360059Z [inf]  Get:119 http://archive.ubuntu.com/ubuntu noble/main amd64 libxshmfence1 amd64 1.3-1build5 [4764 B]

2025-09-05T09:49:13.403625182Z [inf]  Get:120 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 mesa-libgallium amd64 25.0.7-0ubuntu0.24.04.2 [10.3 MB]

2025-09-05T09:49:13.655014947Z [inf]  Get:121 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libgbm1 amd64 25.0.7-0ubuntu0.24.04.2 [32.7 kB]

2025-09-05T09:49:44.107031121Z [inf]  Get:122 http://archive.ubuntu.com/ubuntu noble/main amd64 libgraphite2-3 amd64 1.3.14-2build1 [73.0 kB]

2025-09-05T09:49:44.390747656Z [inf]  Get:123 http://archive.ubuntu.com/ubuntu noble/main amd64 libharfbuzz0b amd64 8.3.0-2build2 [469 kB]

2025-09-05T09:49:44.706719054Z [inf]  Get:124 http://archive.ubuntu.com/ubuntu noble/main amd64 libthai-data all 0.1.29-2build1 [158 kB]

2025-09-05T09:49:44.798724584Z [inf]  Get:125 http://archive.ubuntu.com/ubuntu noble/main amd64 libthai0 amd64 0.1.29-2build1 [18.9 kB]

2025-09-05T09:49:44.876327278Z [inf]  Get:126 http://archive.ubuntu.com/ubuntu noble/main amd64 libpango-1.0-0 amd64 1.52.1+ds-1build1 [231 kB]

2025-09-05T09:49:45.035343467Z [inf]  Get:127 http://archive.ubuntu.com/ubuntu noble/main amd64 libpangoft2-1.0-0 amd64 1.52.1+ds-1build1 [42.5 kB]

2025-09-05T09:49:45.115343354Z [inf]  Get:128 http://archive.ubuntu.com/ubuntu noble/main amd64 libpangocairo-1.0-0 amd64 1.52.1+ds-1build1 [28.8 kB]

2025-09-05T09:49:45.193729158Z [inf]  Get:129 http://archive.ubuntu.com/ubuntu noble/main amd64 libwayland-client0 amd64 1.22.0-2.1build1 [26.4 kB]

2025-09-05T09:49:45.272206257Z [inf]  Get:130 http://archive.ubuntu.com/ubuntu noble/main amd64 libwayland-cursor0 amd64 1.22.0-2.1build1 [10.4 kB]

2025-09-05T09:49:45.34882989Z [inf]  Get:131 http://archive.ubuntu.com/ubuntu noble/main amd64 libwayland-egl1 amd64 1.22.0-2.1build1 [5628 B]

2025-09-05T09:49:45.425216726Z [inf]  Get:132 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcomposite1 amd64 1:0.4.5-1build3 [6320 B]

2025-09-05T09:50:12.561239489Z [inf]  Get:133 http://archive.ubuntu.com/ubuntu noble/main amd64 libxfixes3 amd64 1:6.0.0-2build1 [10.8 kB]

2025-09-05T09:50:12.637693Z [inf]  Get:134 http://archive.ubuntu.com/ubuntu noble/main amd64 libxcursor1 amd64 1:1.2.1-1build1 [20.7 kB]

2025-09-05T09:50:12.7608332Z [inf]  Get:135 http://archive.ubuntu.com/ubuntu noble/main amd64 libxdamage1 amd64 1:1.1.6-1build1 [6150 B]

2025-09-05T09:50:12.845923948Z [inf]  Get:136 http://archive.ubuntu.com/ubuntu noble/main amd64 libxinerama1 amd64 2:1.1.4-3build1 [6396 B]

2025-09-05T09:50:12.930273406Z [inf]  Get:137 http://archive.ubuntu.com/ubuntu noble/main amd64 libxrandr2 amd64 2:1.5.2-2build1 [19.7 kB]

2025-09-05T09:50:13.038010631Z [inf]  Get:138 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libgtk-3-common all 3.24.41-4ubuntu1.3 [1426 kB]

2025-09-05T09:50:13.559450409Z [inf]  Get:139 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 libgtk-3-0t64 amd64 3.24.41-4ubuntu1.3 [2913 kB]

2025-09-05T09:50:13.764324877Z [inf]  Get:140 http://archive.ubuntu.com/ubuntu noble/main amd64 libnspr4 amd64 2:4.35-1.1build1 [117 kB]

2025-09-05T09:50:13.841829631Z [inf]  Get:141 http://archive.ubuntu.com/ubuntu noble/main amd64 libnss3 amd64 2:3.98-1build1 [1445 kB]

2025-09-05T09:50:13.942923035Z [inf]  Get:142 http://archive.ubuntu.com/ubuntu noble/main amd64 x11-common all 1:7.7+23ubuntu3 [21.7 kB]

2025-09-05T09:50:14.019528711Z [inf]  Get:143 http://archive.ubuntu.com/ubuntu noble/main amd64 libxss1 amd64 1:1.2.3-1build3 [7204 B]

2025-09-05T09:50:14.095916918Z [inf]  Get:144 http://archive.ubuntu.com/ubuntu noble/main amd64 libglvnd0 amd64 1.7.0-1build1 [69.6 kB]

2025-09-05T09:50:14.172641254Z [inf]  Get:145 http://archive.ubuntu.com/ubuntu noble/main amd64 libopengl0 amd64 1.7.0-1build1 [32.8 kB]

2025-09-05T09:50:14.249076279Z [inf]  Get:146 http://archive.ubuntu.com/ubuntu noble/main amd64 libglu1-mesa amd64 9.0.2-1.1build1 [152 kB]

2025-09-05T09:50:14.427104993Z [inf]  debconf: delaying package configuration, since apt-utils is not installed

2025-09-05T09:50:14.460329448Z [inf]  Fetched 118 MB in 1min 41s (1177 kB/s)

2025-09-05T09:50:14.479858623Z [inf]  (Reading database ... 
2025-09-05T09:50:14.481185469Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:14.48545194Z [inf]  (Reading database ... 75%
2025-09-05T09:50:14.489272768Z [inf]  (Reading database ... 80%
2025-09-05T09:50:14.492805394Z [inf]  (Reading database ... 85%
2025-09-05T09:50:14.496733176Z [inf]  (Reading database ... 90%
2025-09-05T09:50:14.501595169Z [inf]  (Reading database ... 95%
2025-09-05T09:50:14.506935866Z [inf]  (Reading database ... 100%(Reading database ... 9511 files and directories currently installed.)

2025-09-05T09:50:14.507391717Z [inf]  Preparing to unpack .../bsdutils_1%3a2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:14.510534252Z [inf]  Unpacking bsdutils (1:2.39.3-9ubuntu6.3) over (1:2.39.3-9ubuntu6.2) ...

2025-09-05T09:50:14.558263213Z [inf]  Setting up bsdutils (1:2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:14.579340476Z [inf]  (Reading database ... 
2025-09-05T09:50:14.580138133Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:14.582033379Z [inf]  (Reading database ... 75%
2025-09-05T09:50:14.582439705Z [inf]  (Reading database ... 80%
2025-09-05T09:50:14.582702954Z [inf]  (Reading database ... 85%
2025-09-05T09:50:14.583103705Z [inf]  (Reading database ... 90%
2025-09-05T09:50:14.583681703Z [inf]  (Reading database ... 95%
2025-09-05T09:50:14.584796425Z [inf]  (Reading database ... 100%(Reading database ... 9511 files and directories currently installed.)

2025-09-05T09:50:14.585191345Z [inf]  Preparing to unpack .../util-linux_2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:14.589644918Z [inf]  Unpacking util-linux (2.39.3-9ubuntu6.3) over (2.39.3-9ubuntu6.2) ...

2025-09-05T09:50:14.814666363Z [inf]  Setting up util-linux (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:14.964696756Z [inf]  (Reading database ... 
2025-09-05T09:50:14.965585557Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:14.966112381Z [inf]  (Reading database ... 75%
2025-09-05T09:50:14.966515186Z [inf]  (Reading database ... 80%
2025-09-05T09:50:14.96677645Z [inf]  (Reading database ... 85%
2025-09-05T09:50:14.967229544Z [inf]  (Reading database ... 90%
2025-09-05T09:50:14.967786432Z [inf]  (Reading database ... 95%
2025-09-05T09:50:14.969055088Z [inf]  (Reading database ... 100%(Reading database ... 9511 files and directories currently installed.)

2025-09-05T09:50:14.969444282Z [inf]  Preparing to unpack .../mount_2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:14.972325337Z [inf]  Unpacking mount (2.39.3-9ubuntu6.3) over (2.39.3-9ubuntu6.2) ...

2025-09-05T09:50:15.008004187Z [inf]  Preparing to unpack .../libapparmor1_4.0.1really4.0.1-0ubuntu0.24.04.4_amd64.deb ...

2025-09-05T09:50:15.012058645Z [inf]  Unpacking libapparmor1:amd64 (4.0.1really4.0.1-0ubuntu0.24.04.4) over (4.0.1really4.0.1-0ubuntu0.24.04.3) ...

2025-09-05T09:50:15.030256057Z [inf]  Selecting previously unselected package libargon2-1:amd64.

2025-09-05T09:50:15.031645276Z [inf]  Preparing to unpack .../libargon2-1_0~20190702+dfsg-4build1_amd64.deb ...

2025-09-05T09:50:15.032766019Z [inf]  Unpacking libargon2-1:amd64 (0~20190702+dfsg-4build1) ...

2025-09-05T09:50:15.049011496Z [inf]  Preparing to unpack .../libblkid1_2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:15.051973071Z [inf]  Unpacking libblkid1:amd64 (2.39.3-9ubuntu6.3) over (2.39.3-9ubuntu6.2) ...

2025-09-05T09:50:15.075553645Z [inf]  Setting up libblkid1:amd64 (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:15.095845076Z [inf]  (Reading database ... 
2025-09-05T09:50:15.096587341Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:15.098361686Z [inf]  (Reading database ... 75%
2025-09-05T09:50:15.098772388Z [inf]  (Reading database ... 80%
2025-09-05T09:50:15.098976359Z [inf]  (Reading database ... 85%
2025-09-05T09:50:15.099381743Z [inf]  (Reading database ... 90%
2025-09-05T09:50:15.099941646Z [inf]  (Reading database ... 95%
2025-09-05T09:50:15.100984715Z [inf]  (Reading database ... 100%(Reading database ... 9515 files and directories currently installed.)

2025-09-05T09:50:15.101374535Z [inf]  Preparing to unpack .../libudev1_255.4-1ubuntu8.10_amd64.deb ...

2025-09-05T09:50:15.104526196Z [inf]  Unpacking libudev1:amd64 (255.4-1ubuntu8.10) over (255.4-1ubuntu8.6) ...

2025-09-05T09:50:15.127319509Z [inf]  Setting up libudev1:amd64 (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.146668716Z [inf]  Selecting previously unselected package libdevmapper1.02.1:amd64.
(Reading database ... 
2025-09-05T09:50:15.147450034Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%
2025-09-05T09:50:15.147459438Z [inf]  (Reading database ... 45%
2025-09-05T09:50:15.147494659Z [inf]  (Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:15.149564687Z [inf]  (Reading database ... 75%
2025-09-05T09:50:15.149972112Z [inf]  (Reading database ... 80%
2025-09-05T09:50:15.150200015Z [inf]  (Reading database ... 85%
2025-09-05T09:50:15.150645765Z [inf]  (Reading database ... 90%
2025-09-05T09:50:15.151245914Z [inf]  (Reading database ... 95%
2025-09-05T09:50:15.152349461Z [inf]  (Reading database ... 100%(Reading database ... 9515 files and directories currently installed.)

2025-09-05T09:50:15.152756419Z [inf]  Preparing to unpack .../libdevmapper1.02.1_2%3a1.02.185-3ubuntu3.2_amd64.deb ...

2025-09-05T09:50:15.153905632Z [inf]  Unpacking libdevmapper1.02.1:amd64 (2:1.02.185-3ubuntu3.2) ...

2025-09-05T09:50:15.173385222Z [inf]  Selecting previously unselected package libjson-c5:amd64.

2025-09-05T09:50:15.174610348Z [inf]  Preparing to unpack .../libjson-c5_0.17-1build1_amd64.deb ...

2025-09-05T09:50:15.175738882Z [inf]  Unpacking libjson-c5:amd64 (0.17-1build1) ...

2025-09-05T09:50:15.194355127Z [inf]  Preparing to unpack .../libuuid1_2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:15.197573343Z [inf]  Unpacking libuuid1:amd64 (2.39.3-9ubuntu6.3) over (2.39.3-9ubuntu6.2) ...

2025-09-05T09:50:15.219372034Z [inf]  Setting up libuuid1:amd64 (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:15.23883392Z [inf]  Selecting previously unselected package libcryptsetup12:amd64.
(Reading database ... 
2025-09-05T09:50:15.23964373Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:15.241493894Z [inf]  (Reading database ... 75%
2025-09-05T09:50:15.241889787Z [inf]  (Reading database ... 80%
2025-09-05T09:50:15.242140749Z [inf]  (Reading database ... 85%
2025-09-05T09:50:15.242586399Z [inf]  (Reading database ... 90%
2025-09-05T09:50:15.243075329Z [inf]  (Reading database ... 95%
2025-09-05T09:50:15.244174765Z [inf]  (Reading database ... 100%(Reading database ... 9526 files and directories currently installed.)

2025-09-05T09:50:15.244584572Z [inf]  Preparing to unpack .../libcryptsetup12_2%3a2.7.0-1ubuntu4.2_amd64.deb ...

2025-09-05T09:50:15.245871692Z [inf]  Unpacking libcryptsetup12:amd64 (2:2.7.0-1ubuntu4.2) ...

2025-09-05T09:50:15.267339877Z [inf]  Selecting previously unselected package libfdisk1:amd64.

2025-09-05T09:50:15.268627513Z [inf]  Preparing to unpack .../libfdisk1_2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:15.269805375Z [inf]  Unpacking libfdisk1:amd64 (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:15.289710469Z [inf]  Selecting previously unselected package libkmod2:amd64.

2025-09-05T09:50:15.291243561Z [inf]  Preparing to unpack .../libkmod2_31+20240202-2ubuntu7.1_amd64.deb ...

2025-09-05T09:50:15.292444813Z [inf]  Unpacking libkmod2:amd64 (31+20240202-2ubuntu7.1) ...

2025-09-05T09:50:15.31088908Z [inf]  Preparing to unpack .../libmount1_2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:15.314062649Z [inf]  Unpacking libmount1:amd64 (2.39.3-9ubuntu6.3) over (2.39.3-9ubuntu6.2) ...

2025-09-05T09:50:15.340798463Z [inf]  Setting up libmount1:amd64 (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:15.358960537Z [inf]  Selecting previously unselected package libsystemd-shared:amd64.
(Reading database ... 
2025-09-05T09:50:15.359761562Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:15.36172873Z [inf]  (Reading database ... 75%
2025-09-05T09:50:15.362093743Z [inf]  (Reading database ... 80%
2025-09-05T09:50:15.362344609Z [inf]  (Reading database ... 85%
2025-09-05T09:50:15.363024114Z [inf]  (Reading database ... 90%
2025-09-05T09:50:15.363491536Z [inf]  (Reading database ... 95%
2025-09-05T09:50:15.364328518Z [inf]  (Reading database ... 100%(Reading database ... 9546 files and directories currently installed.)

2025-09-05T09:50:15.364719016Z [inf]  Preparing to unpack .../libsystemd-shared_255.4-1ubuntu8.10_amd64.deb ...

2025-09-05T09:50:15.365901936Z [inf]  Unpacking libsystemd-shared:amd64 (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.412055235Z [inf]  Preparing to unpack .../libsystemd0_255.4-1ubuntu8.10_amd64.deb ...

2025-09-05T09:50:15.41519318Z [inf]  Unpacking libsystemd0:amd64 (255.4-1ubuntu8.10) over (255.4-1ubuntu8.6) ...

2025-09-05T09:50:15.443416472Z [inf]  Setting up libsystemd0:amd64 (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.461577032Z [inf]  Selecting previously unselected package systemd-dev.
(Reading database ... 
2025-09-05T09:50:15.462446209Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:15.463120391Z [inf]  (Reading database ... 75%
2025-09-05T09:50:15.46339572Z [inf]  (Reading database ... 80%
2025-09-05T09:50:15.463673739Z [inf]  (Reading database ... 85%
2025-09-05T09:50:15.464264618Z [inf]  (Reading database ... 90%
2025-09-05T09:50:15.465165366Z [inf]  (Reading database ... 95%
2025-09-05T09:50:15.465518778Z [inf]  (Reading database ... 100%(Reading database ... 9554 files and directories currently installed.)

2025-09-05T09:50:15.465928628Z [inf]  Preparing to unpack .../systemd-dev_255.4-1ubuntu8.10_all.deb ...

2025-09-05T09:50:15.466862885Z [inf]  Unpacking systemd-dev (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.492156304Z [inf]  Selecting previously unselected package systemd.

2025-09-05T09:50:15.493401225Z [inf]  Preparing to unpack .../systemd_255.4-1ubuntu8.10_amd64.deb ...

2025-09-05T09:50:15.50525694Z [inf]  Unpacking systemd (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.629620188Z [inf]  Setting up libapparmor1:amd64 (4.0.1really4.0.1-0ubuntu0.24.04.4) ...

2025-09-05T09:50:15.632789181Z [inf]  Setting up libargon2-1:amd64 (0~20190702+dfsg-4build1) ...

2025-09-05T09:50:15.635531766Z [inf]  Setting up libdevmapper1.02.1:amd64 (2:1.02.185-3ubuntu3.2) ...

2025-09-05T09:50:15.638532568Z [inf]  Setting up libjson-c5:amd64 (0.17-1build1) ...

2025-09-05T09:50:15.641894443Z [inf]  Setting up libcryptsetup12:amd64 (2:2.7.0-1ubuntu4.2) ...

2025-09-05T09:50:15.645474894Z [inf]  Setting up libfdisk1:amd64 (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:15.648245497Z [inf]  Setting up libkmod2:amd64 (31+20240202-2ubuntu7.1) ...

2025-09-05T09:50:15.650937079Z [inf]  Setting up libsystemd-shared:amd64 (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.653927055Z [inf]  Setting up systemd-dev (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.656622684Z [inf]  Setting up mount (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:15.659267597Z [inf]  Setting up systemd (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.675270154Z [inf]  Created symlink /etc/systemd/system/getty.target.wants/getty@tty1.service → /usr/lib/systemd/system/getty@.service.

2025-09-05T09:50:15.67939493Z [inf]  Created symlink /etc/systemd/system/multi-user.target.wants/remote-fs.target → /usr/lib/systemd/system/remote-fs.target.

2025-09-05T09:50:15.682996632Z [inf]  Created symlink /etc/systemd/system/sysinit.target.wants/systemd-pstore.service → /usr/lib/systemd/system/systemd-pstore.service.

2025-09-05T09:50:15.68722176Z [inf]  Initializing machine ID from random generator.

2025-09-05T09:50:15.708557986Z [inf]  [0;1;31m/usr/lib/tmpfiles.d/systemd-network.conf:10: Failed to resolve user 'systemd-network': No such process[0m
[0;1;31m/usr/lib/tmpfiles.d/systemd-network.conf:11: Failed to resolve user 'systemd-network': No such process[0m
[0;1;31m/usr/lib/tmpfiles.d/systemd-network.conf:12: Failed to resolve user 'systemd-network': No such process[0m

2025-09-05T09:50:15.708601248Z [inf]  [0;1;31m/usr/lib/tmpfiles.d/systemd-network.conf:13: Failed to resolve user 'systemd-network': No such process[0m

2025-09-05T09:50:15.708978811Z [inf]  [0;1;31m/usr/lib/tmpfiles.d/systemd.conf:22: Failed to resolve group 'systemd-journal': No such process[0m
[0;1;31m/usr/lib/tmpfiles.d/systemd.conf:23: Failed to resolve group 'systemd-journal': No such process[0m

2025-09-05T09:50:15.709098773Z [inf]  [0;1;31m/usr/lib/tmpfiles.d/systemd.conf:28: Failed to resolve group 'systemd-journal': No such process[0m
[0;1;31m/usr/lib/tmpfiles.d/systemd.conf:29: Failed to resolve group 'systemd-journal': No such process[0m
[0;1;31m/usr/lib/tmpfiles.d/systemd.conf:30: Failed to resolve group 'systemd-journal': No such process[0m

2025-09-05T09:50:15.716979585Z [inf]  Creating group 'systemd-journal' with GID 999.
Creating group 'systemd-network' with GID 998.

2025-09-05T09:50:15.717015967Z [inf]  Creating user 'systemd-network' (systemd Network Management) with UID 998 and GID 998.

2025-09-05T09:50:15.754255498Z [inf]  Selecting previously unselected package systemd-sysv.
(Reading database ... 
2025-09-05T09:50:15.755204394Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:15.75747201Z [inf]  (Reading database ... 75%
2025-09-05T09:50:15.757836972Z [inf]  (Reading database ... 80%
2025-09-05T09:50:15.758130436Z [inf]  (Reading database ... 85%
2025-09-05T09:50:15.758851699Z [inf]  (Reading database ... 90%
2025-09-05T09:50:15.759635439Z [inf]  (Reading database ... 95%
2025-09-05T09:50:15.760357056Z [inf]  (Reading database ... 100%(Reading database ... 10533 files and directories currently installed.)

2025-09-05T09:50:15.760843266Z [inf]  Preparing to unpack .../systemd-sysv_255.4-1ubuntu8.10_amd64.deb ...

2025-09-05T09:50:15.761926423Z [inf]  Unpacking systemd-sysv (255.4-1ubuntu8.10) ...

2025-09-05T09:50:15.778479176Z [inf]  Selecting previously unselected package adduser.

2025-09-05T09:50:15.77948459Z [inf]  Preparing to unpack .../adduser_3.137ubuntu1_all.deb ...

2025-09-05T09:50:15.781665945Z [inf]  Unpacking adduser (3.137ubuntu1) ...

2025-09-05T09:50:15.80565787Z [inf]  Setting up adduser (3.137ubuntu1) ...

2025-09-05T09:50:15.830098582Z [inf]  Selecting previously unselected package apparmor.
(Reading database ... 
2025-09-05T09:50:15.830961999Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:15.833041999Z [inf]  (Reading database ... 75%
2025-09-05T09:50:15.833366411Z [inf]  (Reading database ... 80%
2025-09-05T09:50:15.83363537Z [inf]  (Reading database ... 85%
2025-09-05T09:50:15.834242467Z [inf]  (Reading database ... 90%
2025-09-05T09:50:15.835173203Z [inf]  (Reading database ... 95%
2025-09-05T09:50:15.835611439Z [inf]  (Reading database ... 100%(Reading database ... 10599 files and directories currently installed.)

2025-09-05T09:50:15.836033345Z [inf]  Preparing to unpack .../00-apparmor_4.0.1really4.0.1-0ubuntu0.24.04.4_amd64.deb ...

2025-09-05T09:50:16.073543502Z [inf]  Unpacking apparmor (4.0.1really4.0.1-0ubuntu0.24.04.4) ...

2025-09-05T09:50:16.121058073Z [inf]  Selecting previously unselected package libfuse3-3:amd64.

2025-09-05T09:50:16.122383637Z [inf]  Preparing to unpack .../01-libfuse3-3_3.14.0-5build1_amd64.deb ...

2025-09-05T09:50:16.123404555Z [inf]  Unpacking libfuse3-3:amd64 (3.14.0-5build1) ...

2025-09-05T09:50:16.143067308Z [inf]  Selecting previously unselected package fuse3.

2025-09-05T09:50:16.144670665Z [inf]  Preparing to unpack .../02-fuse3_3.14.0-5build1_amd64.deb ...

2025-09-05T09:50:16.145907144Z [inf]  Unpacking fuse3 (3.14.0-5build1) ...

2025-09-05T09:50:16.163497973Z [inf]  Selecting previously unselected package libbsd0:amd64.

2025-09-05T09:50:16.165161019Z [inf]  Preparing to unpack .../03-libbsd0_0.12.1-1build1.1_amd64.deb ...

2025-09-05T09:50:16.166170488Z [inf]  Unpacking libbsd0:amd64 (0.12.1-1build1.1) ...

2025-09-05T09:50:16.181859047Z [inf]  Selecting previously unselected package libedit2:amd64.

2025-09-05T09:50:16.183179905Z [inf]  Preparing to unpack .../04-libedit2_3.1-20230828-1build1_amd64.deb ...

2025-09-05T09:50:16.184392872Z [inf]  Unpacking libedit2:amd64 (3.1-20230828-1build1) ...

2025-09-05T09:50:16.202883938Z [inf]  Selecting previously unselected package libcbor0.10:amd64.

2025-09-05T09:50:16.204263432Z [inf]  Preparing to unpack .../05-libcbor0.10_0.10.2-1.2ubuntu2_amd64.deb ...

2025-09-05T09:50:16.20540369Z [inf]  Unpacking libcbor0.10:amd64 (0.10.2-1.2ubuntu2) ...

2025-09-05T09:50:16.221509514Z [inf]  Selecting previously unselected package libfido2-1:amd64.

2025-09-05T09:50:16.222847604Z [inf]  Preparing to unpack .../06-libfido2-1_1.14.0-1build3_amd64.deb ...

2025-09-05T09:50:16.223878503Z [inf]  Unpacking libfido2-1:amd64 (1.14.0-1build3) ...

2025-09-05T09:50:16.242503477Z [inf]  Selecting previously unselected package openssh-client.

2025-09-05T09:50:16.243899522Z [inf]  Preparing to unpack .../07-openssh-client_1%3a9.6p1-3ubuntu13.13_amd64.deb ...

2025-09-05T09:50:16.249743427Z [inf]  Unpacking openssh-client (1:9.6p1-3ubuntu13.13) ...

2025-09-05T09:50:16.28334168Z [inf]  Selecting previously unselected package liblzo2-2:amd64.

2025-09-05T09:50:16.284819801Z [inf]  Preparing to unpack .../08-liblzo2-2_2.10-2build4_amd64.deb ...

2025-09-05T09:50:16.285820496Z [inf]  Unpacking liblzo2-2:amd64 (2.10-2build4) ...

2025-09-05T09:50:16.300059973Z [inf]  Selecting previously unselected package squashfs-tools.

2025-09-05T09:50:16.301204696Z [inf]  Preparing to unpack .../09-squashfs-tools_1%3a4.6.1-1build1_amd64.deb ...

2025-09-05T09:50:16.302252668Z [inf]  Unpacking squashfs-tools (1:4.6.1-1build1) ...

2025-09-05T09:50:16.3232725Z [inf]  Selecting previously unselected package udev.

2025-09-05T09:50:16.324573729Z [inf]  Preparing to unpack .../10-udev_255.4-1ubuntu8.10_amd64.deb ...

2025-09-05T09:50:16.33425514Z [inf]  Unpacking udev (255.4-1ubuntu8.10) ...

2025-09-05T09:50:16.399275192Z [inf]  Selecting previously unselected package libdbus-1-3:amd64.

2025-09-05T09:50:16.400800539Z [inf]  Preparing to unpack .../11-libdbus-1-3_1.14.10-4ubuntu4.1_amd64.deb ...

2025-09-05T09:50:16.401843633Z [inf]  Unpacking libdbus-1-3:amd64 (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:16.418453138Z [inf]  Selecting previously unselected package dbus-bin.

2025-09-05T09:50:16.419739641Z [inf]  Preparing to unpack .../12-dbus-bin_1.14.10-4ubuntu4.1_amd64.deb ...

2025-09-05T09:50:16.420955859Z [inf]  Unpacking dbus-bin (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:16.437432539Z [inf]  Selecting previously unselected package dbus-session-bus-common.

2025-09-05T09:50:16.438576241Z [inf]  Preparing to unpack .../13-dbus-session-bus-common_1.14.10-4ubuntu4.1_all.deb ...

2025-09-05T09:50:16.439568605Z [inf]  Unpacking dbus-session-bus-common (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:16.457939805Z [inf]  Selecting previously unselected package dbus-daemon.

2025-09-05T09:50:16.459378269Z [inf]  Preparing to unpack .../14-dbus-daemon_1.14.10-4ubuntu4.1_amd64.deb ...

2025-09-05T09:50:16.46037605Z [inf]  Unpacking dbus-daemon (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:16.477925078Z [inf]  Selecting previously unselected package dbus-system-bus-common.

2025-09-05T09:50:16.479270614Z [inf]  Preparing to unpack .../15-dbus-system-bus-common_1.14.10-4ubuntu4.1_all.deb ...

2025-09-05T09:50:16.480372084Z [inf]  Unpacking dbus-system-bus-common (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:16.499984999Z [inf]  Selecting previously unselected package dbus.

2025-09-05T09:50:16.501408742Z [inf]  Preparing to unpack .../16-dbus_1.14.10-4ubuntu4.1_amd64.deb ...

2025-09-05T09:50:16.50345923Z [inf]  Unpacking dbus (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:16.52094784Z [inf]  Selecting previously unselected package libpam-systemd:amd64.

2025-09-05T09:50:16.522086953Z [inf]  Preparing to unpack .../17-libpam-systemd_255.4-1ubuntu8.10_amd64.deb ...

2025-09-05T09:50:16.523191948Z [inf]  Unpacking libpam-systemd:amd64 (255.4-1ubuntu8.10) ...

2025-09-05T09:50:16.541933923Z [inf]  Selecting previously unselected package dbus-user-session.

2025-09-05T09:50:16.543004938Z [inf]  Preparing to unpack .../18-dbus-user-session_1.14.10-4ubuntu4.1_amd64.deb ...

2025-09-05T09:50:16.544014392Z [inf]  Unpacking dbus-user-session (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:16.561357766Z [inf]  Selecting previously unselected package snapd.

2025-09-05T09:50:16.562376026Z [inf]  Preparing to unpack .../19-snapd_2.68.5+ubuntu24.04.1_amd64.deb ...

2025-09-05T09:50:16.577949007Z [inf]  Unpacking snapd (2.68.5+ubuntu24.04.1) ...

2025-09-05T09:50:17.038609524Z [inf]  Setting up apparmor (4.0.1really4.0.1-0ubuntu0.24.04.4) ...

2025-09-05T09:50:17.355135873Z [inf]  debconf: unable to initialize frontend: Dialog
debconf: (Dialog frontend will not work on a dumb terminal, an emacs shell buffer, or without a controlling terminal.)
debconf: falling back to frontend: Readline

2025-09-05T09:50:17.362647247Z [inf]  debconf: unable to initialize frontend: Readline
debconf: (This frontend requires a controlling tty.)
debconf: falling back to frontend: Teletype

2025-09-05T09:50:17.751023714Z [inf]  Created symlink /etc/systemd/system/sysinit.target.wants/apparmor.service → /usr/lib/systemd/system/apparmor.service.

2025-09-05T09:50:17.772639224Z [inf]  Setting up libfuse3-3:amd64 (3.14.0-5build1) ...

2025-09-05T09:50:17.775540189Z [inf]  Setting up fuse3 (3.14.0-5build1) ...

2025-09-05T09:50:17.785000563Z [inf]  Setting up libbsd0:amd64 (0.12.1-1build1.1) ...

2025-09-05T09:50:17.78768822Z [inf]  Setting up libedit2:amd64 (3.1-20230828-1build1) ...

2025-09-05T09:50:17.790533586Z [inf]  Setting up libcbor0.10:amd64 (0.10.2-1.2ubuntu2) ...

2025-09-05T09:50:17.793279801Z [inf]  Setting up libfido2-1:amd64 (1.14.0-1build3) ...

2025-09-05T09:50:17.796021152Z [inf]  Setting up openssh-client (1:9.6p1-3ubuntu13.13) ...

2025-09-05T09:50:17.85588658Z [inf]  Setting up liblzo2-2:amd64 (2.10-2build4) ...

2025-09-05T09:50:17.858808552Z [inf]  Setting up squashfs-tools (1:4.6.1-1build1) ...

2025-09-05T09:50:17.861767472Z [inf]  Setting up udev (255.4-1ubuntu8.10) ...

2025-09-05T09:50:18.241625954Z [inf]  Creating group 'input' with GID 997.
Creating group 'sgx' with GID 996.
Creating group 'kvm' with GID 995.
Creating group 'render' with GID 994.

2025-09-05T09:50:18.254401373Z [inf]  Setting up libdbus-1-3:amd64 (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:18.257249475Z [inf]  Setting up dbus-bin (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:18.260139326Z [inf]  Setting up dbus-session-bus-common (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:18.263093537Z [inf]  Setting up dbus-daemon (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:18.272897576Z [inf]  [0;1;31m/usr/lib/tmpfiles.d/dbus.conf:13: Failed to resolve user 'messagebus': No such process[0m

2025-09-05T09:50:18.274527276Z [inf]  Setting up dbus-system-bus-common (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:18.341486565Z [inf]  Setting up dbus (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:18.359895724Z [inf]  Setting up systemd-sysv (255.4-1ubuntu8.10) ...

2025-09-05T09:50:18.37719684Z [inf]  Setting up libpam-systemd:amd64 (255.4-1ubuntu8.10) ...

2025-09-05T09:50:18.451358576Z [inf]  debconf: unable to initialize frontend: Dialog
debconf: (Dialog frontend will not work on a dumb terminal, an emacs shell buffer, or without a controlling terminal.)
debconf: falling back to frontend: Readline

2025-09-05T09:50:18.457738061Z [inf]  debconf: unable to initialize frontend: Readline
debconf: (This frontend requires a controlling tty.)
debconf: falling back to frontend: Teletype

2025-09-05T09:50:18.515283025Z [inf]  Setting up dbus-user-session (1.14.10-4ubuntu4.1) ...

2025-09-05T09:50:18.519934631Z [inf]  Setting up snapd (2.68.5+ubuntu24.04.1) ...

2025-09-05T09:50:18.648063411Z [inf]  Created symlink /etc/systemd/system/multi-user.target.wants/snapd.apparmor.service → /usr/lib/systemd/system/snapd.apparmor.service.

2025-09-05T09:50:18.76036781Z [inf]  Created symlink /etc/systemd/system/multi-user.target.wants/snapd.autoimport.service → /usr/lib/systemd/system/snapd.autoimport.service.

2025-09-05T09:50:18.873610842Z [inf]  Created symlink /etc/systemd/system/multi-user.target.wants/snapd.core-fixup.service → /usr/lib/systemd/system/snapd.core-fixup.service.

2025-09-05T09:50:18.986407217Z [inf]  Created symlink /etc/systemd/system/multi-user.target.wants/snapd.recovery-chooser-trigger.service → /usr/lib/systemd/system/snapd.recovery-chooser-trigger.service.

2025-09-05T09:50:19.100737309Z [inf]  Created symlink /etc/systemd/system/multi-user.target.wants/snapd.seeded.service → /usr/lib/systemd/system/snapd.seeded.service.
Created symlink /etc/systemd/system/cloud-final.service.wants/snapd.seeded.service → /usr/lib/systemd/system/snapd.seeded.service.
Unit /usr/lib/systemd/system/snapd.seeded.service is added as a dependency to a non-existent unit cloud-final.service.

2025-09-05T09:50:19.216086186Z [inf]  Created symlink /etc/systemd/system/multi-user.target.wants/snapd.service → /usr/lib/systemd/system/snapd.service.

2025-09-05T09:50:19.329803012Z [inf]  Created symlink /etc/systemd/system/timers.target.wants/snapd.snap-repair.timer → /usr/lib/systemd/system/snapd.snap-repair.timer.

2025-09-05T09:50:19.443863429Z [inf]  Created symlink /etc/systemd/system/sockets.target.wants/snapd.socket → /usr/lib/systemd/system/snapd.socket.

2025-09-05T09:50:19.557266197Z [inf]  Created symlink /etc/systemd/system/final.target.wants/snapd.system-shutdown.service → /usr/lib/systemd/system/snapd.system-shutdown.service.

2025-09-05T09:50:19.609115274Z [inf]  Selecting previously unselected package chromium-browser.
(Reading database ... 
2025-09-05T09:50:19.610076206Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:19.612418218Z [inf]  (Reading database ... 75%
2025-09-05T09:50:19.612748145Z [inf]  (Reading database ... 80%
2025-09-05T09:50:19.613007541Z [inf]  (Reading database ... 85%
2025-09-05T09:50:19.613643196Z [inf]  (Reading database ... 90%
2025-09-05T09:50:19.614778276Z [inf]  (Reading database ... 95%
2025-09-05T09:50:19.615148229Z [inf]  (Reading database ... 100%(Reading database ... 11349 files and directories currently installed.)

2025-09-05T09:50:19.61560872Z [inf]  Preparing to unpack .../chromium-browser_2%3a1snap1-0ubuntu2_amd64.deb ...

2025-09-05T09:50:19.681548556Z [inf]  debconf: unable to initialize frontend: Dialog
debconf: (Dialog frontend will not work on a dumb terminal, an emacs shell buffer, or without a controlling terminal.)
debconf: falling back to frontend: Readline

2025-09-05T09:50:19.688208388Z [inf]  debconf: unable to initialize frontend: Readline
debconf: (This frontend requires a controlling tty.)
debconf: falling back to frontend: Teletype

2025-09-05T09:50:19.695649323Z [inf]  => Installing the chromium snap
==> Checking connectivity with the snap store
===> System doesn't have a working snapd, skipping

2025-09-05T09:50:19.710167325Z [inf]  Unpacking chromium-browser (2:1snap1-0ubuntu2) ...

2025-09-05T09:50:19.732100232Z [inf]  Preparing to unpack .../libsmartcols1_2.39.3-9ubuntu6.3_amd64.deb ...

2025-09-05T09:50:19.735508092Z [inf]  Unpacking libsmartcols1:amd64 (2.39.3-9ubuntu6.3) over (2.39.3-9ubuntu6.2) ...

2025-09-05T09:50:19.760246157Z [inf]  Setting up libsmartcols1:amd64 (2.39.3-9ubuntu6.3) ...

2025-09-05T09:50:19.784776528Z [inf]  Selecting previously unselected package libelf1t64:amd64.
(Reading database ... 
2025-09-05T09:50:19.78579721Z [inf]  (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%
2025-09-05T09:50:19.788137927Z [inf]  (Reading database ... 75%
2025-09-05T09:50:19.788526517Z [inf]  (Reading database ... 80%
2025-09-05T09:50:19.788844466Z [inf]  (Reading database ... 85%
2025-09-05T09:50:19.789490298Z [inf]  (Reading database ... 90%
2025-09-05T09:50:19.79067469Z [inf]  (Reading database ... 95%
2025-09-05T09:50:19.79106874Z [inf]  (Reading database ... 100%(Reading database ... 11377 files and directories currently installed.)

2025-09-05T09:50:19.791608112Z [inf]  Preparing to unpack .../000-libelf1t64_0.190-1.1ubuntu0.1_amd64.deb ...

2025-09-05T09:50:19.792748537Z [inf]  Unpacking libelf1t64:amd64 (0.190-1.1ubuntu0.1) ...

2025-09-05T09:50:19.81123715Z [inf]  Selecting previously unselected package libfribidi0:amd64.

2025-09-05T09:50:19.812710569Z [inf]  Preparing to unpack .../001-libfribidi0_1.0.13-3build1_amd64.deb ...

2025-09-05T09:50:19.813871505Z [inf]  Unpacking libfribidi0:amd64 (1.0.13-3build1) ...

2025-09-05T09:50:19.832631214Z [inf]  Selecting previously unselected package libglib2.0-0t64:amd64.

2025-09-05T09:50:19.834282244Z [inf]  Preparing to unpack .../002-libglib2.0-0t64_2.80.0-6ubuntu3.4_amd64.deb ...

2025-09-05T09:50:19.844150859Z [inf]  Unpacking libglib2.0-0t64:amd64 (2.80.0-6ubuntu3.4) ...

2025-09-05T09:50:19.879121896Z [inf]  Selecting previously unselected package libicu74:amd64.

2025-09-05T09:50:19.880866939Z [inf]  Preparing to unpack .../003-libicu74_74.2-1ubuntu3.1_amd64.deb ...

2025-09-05T09:50:19.881913102Z [inf]  Unpacking libicu74:amd64 (74.2-1ubuntu3.1) ...

2025-09-05T09:50:20.043540206Z [inf]  Selecting previously unselected package libsqlite3-0:amd64.

2025-09-05T09:50:20.045226692Z [inf]  Preparing to unpack .../004-libsqlite3-0_3.45.1-1ubuntu2.4_amd64.deb ...

2025-09-05T09:50:20.046475389Z [inf]  Unpacking libsqlite3-0:amd64 (3.45.1-1ubuntu2.4) ...

2025-09-05T09:50:20.071454862Z [inf]  Selecting previously unselected package libxml2:amd64.

2025-09-05T09:50:20.073170716Z [inf]  Preparing to unpack .../005-libxml2_2.9.14+dfsg-1.3ubuntu3.4_amd64.deb ...

2025-09-05T09:50:20.07441014Z [inf]  Unpacking libxml2:amd64 (2.9.14+dfsg-1.3ubuntu3.4) ...

2025-09-05T09:50:20.101170336Z [inf]  Selecting previously unselected package shared-mime-info.

2025-09-05T09:50:20.10292307Z [inf]  Preparing to unpack .../006-shared-mime-info_2.4-4_amd64.deb ...

2025-09-05T09:50:20.104112128Z [inf]  Unpacking shared-mime-info (2.4-4) ...

2025-09-05T09:50:20.131380907Z [inf]  Selecting previously unselected package xkb-data.

2025-09-05T09:50:20.132725415Z [inf]  Preparing to unpack .../007-xkb-data_2.41-2ubuntu1.1_all.deb ...

2025-09-05T09:50:20.133864683Z [inf]  Unpacking xkb-data (2.41-2ubuntu1.1) ...

2025-09-05T09:50:20.187458477Z [inf]  Selecting previously unselected package libdrm-common.

2025-09-05T09:50:20.189136457Z [inf]  Preparing to unpack .../008-libdrm-common_2.4.122-1~ubuntu0.24.04.1_all.deb ...

2025-09-05T09:50:20.19045375Z [inf]  Unpacking libdrm-common (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:20.209372798Z [inf]  Selecting previously unselected package libdrm2:amd64.

2025-09-05T09:50:20.210927081Z [inf]  Preparing to unpack .../009-libdrm2_2.4.122-1~ubuntu0.24.04.1_amd64.deb ...

2025-09-05T09:50:20.212232075Z [inf]  Unpacking libdrm2:amd64 (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:20.230268392Z [inf]  Selecting previously unselected package libpng16-16t64:amd64.

2025-09-05T09:50:20.231912255Z [inf]  Preparing to unpack .../010-libpng16-16t64_1.6.43-5build1_amd64.deb ...

2025-09-05T09:50:20.233115062Z [inf]  Unpacking libpng16-16t64:amd64 (1.6.43-5build1) ...

2025-09-05T09:50:20.2523221Z [inf]  Selecting previously unselected package libsensors-config.

2025-09-05T09:50:20.253893036Z [inf]  Preparing to unpack .../011-libsensors-config_1%3a3.6.0-9build1_all.deb ...

2025-09-05T09:50:20.25546169Z [inf]  Unpacking libsensors-config (1:3.6.0-9build1) ...

2025-09-05T09:50:20.275190427Z [inf]  Selecting previously unselected package libsensors5:amd64.

2025-09-05T09:50:20.276765565Z [inf]  Preparing to unpack .../012-libsensors5_1%3a3.6.0-9build1_amd64.deb ...

2025-09-05T09:50:20.282130627Z [inf]  Unpacking libsensors5:amd64 (1:3.6.0-9build1) ...

2025-09-05T09:50:20.299383152Z [inf]  Selecting previously unselected package libxau6:amd64.

2025-09-05T09:50:20.300842321Z [inf]  Preparing to unpack .../013-libxau6_1%3a1.0.9-1build6_amd64.deb ...

2025-09-05T09:50:20.302185721Z [inf]  Unpacking libxau6:amd64 (1:1.0.9-1build6) ...

2025-09-05T09:50:20.319550939Z [inf]  Selecting previously unselected package libxdmcp6:amd64.

2025-09-05T09:50:20.320934127Z [inf]  Preparing to unpack .../014-libxdmcp6_1%3a1.1.3-0ubuntu6_amd64.deb ...

2025-09-05T09:50:20.322270229Z [inf]  Unpacking libxdmcp6:amd64 (1:1.1.3-0ubuntu6) ...

2025-09-05T09:50:20.33848476Z [inf]  Selecting previously unselected package libxcb1:amd64.

2025-09-05T09:50:20.339827184Z [inf]  Preparing to unpack .../015-libxcb1_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:20.341088312Z [inf]  Unpacking libxcb1:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:20.356699635Z [inf]  Selecting previously unselected package libx11-data.

2025-09-05T09:50:20.357997877Z [inf]  Preparing to unpack .../016-libx11-data_2%3a1.8.7-1build1_all.deb ...

2025-09-05T09:50:20.359207217Z [inf]  Unpacking libx11-data (2:1.8.7-1build1) ...

2025-09-05T09:50:20.400895999Z [inf]  Selecting previously unselected package libx11-6:amd64.

2025-09-05T09:50:20.402337188Z [inf]  Preparing to unpack .../017-libx11-6_2%3a1.8.7-1build1_amd64.deb ...

2025-09-05T09:50:20.404277085Z [inf]  Unpacking libx11-6:amd64 (2:1.8.7-1build1) ...

2025-09-05T09:50:20.428544872Z [inf]  Selecting previously unselected package libxext6:amd64.

2025-09-05T09:50:20.429920729Z [inf]  Preparing to unpack .../018-libxext6_2%3a1.3.4-1build2_amd64.deb ...

2025-09-05T09:50:20.431136972Z [inf]  Unpacking libxext6:amd64 (2:1.3.4-1build2) ...

2025-09-05T09:50:20.447610918Z [inf]  Selecting previously unselected package libxkbcommon0:amd64.

2025-09-05T09:50:20.448956808Z [inf]  Preparing to unpack .../019-libxkbcommon0_1.6.0-1build1_amd64.deb ...

2025-09-05T09:50:20.450303113Z [inf]  Unpacking libxkbcommon0:amd64 (1.6.0-1build1) ...

2025-09-05T09:50:20.467561398Z [inf]  Selecting previously unselected package libgdk-pixbuf2.0-common.

2025-09-05T09:50:20.468758054Z [inf]  Preparing to unpack .../020-libgdk-pixbuf2.0-common_2.42.10+dfsg-3ubuntu3.2_all.deb ...

2025-09-05T09:50:20.469929704Z [inf]  Unpacking libgdk-pixbuf2.0-common (2.42.10+dfsg-3ubuntu3.2) ...

2025-09-05T09:50:20.486693358Z [inf]  Selecting previously unselected package libjpeg-turbo8:amd64.

2025-09-05T09:50:20.4877978Z [inf]  Preparing to unpack .../021-libjpeg-turbo8_2.1.5-2ubuntu2_amd64.deb ...

2025-09-05T09:50:20.488906586Z [inf]  Unpacking libjpeg-turbo8:amd64 (2.1.5-2ubuntu2) ...

2025-09-05T09:50:20.50708173Z [inf]  Selecting previously unselected package libjpeg8:amd64.

2025-09-05T09:50:20.508231776Z [inf]  Preparing to unpack .../022-libjpeg8_8c-2ubuntu11_amd64.deb ...

2025-09-05T09:50:20.509521862Z [inf]  Unpacking libjpeg8:amd64 (8c-2ubuntu11) ...

2025-09-05T09:50:20.525190536Z [inf]  Selecting previously unselected package libdeflate0:amd64.

2025-09-05T09:50:20.526312772Z [inf]  Preparing to unpack .../023-libdeflate0_1.19-1build1.1_amd64.deb ...

2025-09-05T09:50:20.527763346Z [inf]  Unpacking libdeflate0:amd64 (1.19-1build1.1) ...

2025-09-05T09:50:20.545163856Z [inf]  Selecting previously unselected package libjbig0:amd64.

2025-09-05T09:50:20.54624848Z [inf]  Preparing to unpack .../024-libjbig0_2.1-6.1ubuntu2_amd64.deb ...

2025-09-05T09:50:20.547646418Z [inf]  Unpacking libjbig0:amd64 (2.1-6.1ubuntu2) ...

2025-09-05T09:50:20.566262999Z [inf]  Selecting previously unselected package liblerc4:amd64.

2025-09-05T09:50:20.567448287Z [inf]  Preparing to unpack .../025-liblerc4_4.0.0+ds-4ubuntu2_amd64.deb ...

2025-09-05T09:50:20.568729469Z [inf]  Unpacking liblerc4:amd64 (4.0.0+ds-4ubuntu2) ...

2025-09-05T09:50:20.587190613Z [inf]  Selecting previously unselected package libsharpyuv0:amd64.

2025-09-05T09:50:20.588367653Z [inf]  Preparing to unpack .../026-libsharpyuv0_1.3.2-0.4build3_amd64.deb ...

2025-09-05T09:50:20.589531482Z [inf]  Unpacking libsharpyuv0:amd64 (1.3.2-0.4build3) ...

2025-09-05T09:50:20.606063835Z [inf]  Selecting previously unselected package libwebp7:amd64.

2025-09-05T09:50:20.607156476Z [inf]  Preparing to unpack .../027-libwebp7_1.3.2-0.4build3_amd64.deb ...

2025-09-05T09:50:20.608415876Z [inf]  Unpacking libwebp7:amd64 (1.3.2-0.4build3) ...

2025-09-05T09:50:20.628425226Z [inf]  Selecting previously unselected package libtiff6:amd64.

2025-09-05T09:50:20.629589427Z [inf]  Preparing to unpack .../028-libtiff6_4.5.1+git230720-4ubuntu2.3_amd64.deb ...

2025-09-05T09:50:20.630869337Z [inf]  Unpacking libtiff6:amd64 (4.5.1+git230720-4ubuntu2.3) ...

2025-09-05T09:50:20.651633783Z [inf]  Selecting previously unselected package libgdk-pixbuf-2.0-0:amd64.

2025-09-05T09:50:20.652845026Z [inf]  Preparing to unpack .../029-libgdk-pixbuf-2.0-0_2.42.10+dfsg-3ubuntu3.2_amd64.deb ...

2025-09-05T09:50:20.653942473Z [inf]  Unpacking libgdk-pixbuf-2.0-0:amd64 (2.42.10+dfsg-3ubuntu3.2) ...

2025-09-05T09:50:20.672774695Z [inf]  Selecting previously unselected package gtk-update-icon-cache.

2025-09-05T09:50:20.673949971Z [inf]  Preparing to unpack .../030-gtk-update-icon-cache_3.24.41-4ubuntu1.3_amd64.deb ...

2025-09-05T09:50:20.675050588Z [inf]  Unpacking gtk-update-icon-cache (3.24.41-4ubuntu1.3) ...

2025-09-05T09:50:20.691663239Z [inf]  Selecting previously unselected package hicolor-icon-theme.

2025-09-05T09:50:20.693182069Z [inf]  Preparing to unpack .../031-hicolor-icon-theme_0.17-2_all.deb ...

2025-09-05T09:50:20.694519879Z [inf]  Unpacking hicolor-icon-theme (0.17-2) ...

2025-09-05T09:50:20.748669795Z [inf]  Selecting previously unselected package humanity-icon-theme.

2025-09-05T09:50:20.750023917Z [inf]  Preparing to unpack .../032-humanity-icon-theme_0.6.16_all.deb ...

2025-09-05T09:50:20.751127499Z [inf]  Unpacking humanity-icon-theme (0.6.16) ...

2025-09-05T09:50:21.475051755Z [inf]  Selecting previously unselected package ubuntu-mono.

2025-09-05T09:50:21.480727775Z [inf]  Preparing to unpack .../033-ubuntu-mono_24.04-0ubuntu1_all.deb ...

2025-09-05T09:50:21.482098541Z [inf]  Unpacking ubuntu-mono (24.04-0ubuntu1) ...

2025-09-05T09:50:21.931657646Z [inf]  Selecting previously unselected package adwaita-icon-theme.

2025-09-05T09:50:21.93494593Z [inf]  Preparing to unpack .../034-adwaita-icon-theme_46.0-1_all.deb ...

2025-09-05T09:50:21.936432332Z [inf]  Unpacking adwaita-icon-theme (46.0-1) ...

2025-09-05T09:50:22.068269908Z [inf]  Selecting previously unselected package at-spi2-common.

2025-09-05T09:50:22.071127954Z [inf]  Preparing to unpack .../035-at-spi2-common_2.52.0-1build1_all.deb ...

2025-09-05T09:50:22.072543317Z [inf]  Unpacking at-spi2-common (2.52.0-1build1) ...

2025-09-05T09:50:22.089338223Z [inf]  Selecting previously unselected package libdconf1:amd64.

2025-09-05T09:50:22.092307415Z [inf]  Preparing to unpack .../036-libdconf1_0.40.0-4build2_amd64.deb ...

2025-09-05T09:50:22.093609479Z [inf]  Unpacking libdconf1:amd64 (0.40.0-4build2) ...

2025-09-05T09:50:22.110492687Z [inf]  Selecting previously unselected package dconf-service.

2025-09-05T09:50:22.113495235Z [inf]  Preparing to unpack .../037-dconf-service_0.40.0-4build2_amd64.deb ...

2025-09-05T09:50:22.114707983Z [inf]  Unpacking dconf-service (0.40.0-4build2) ...

2025-09-05T09:50:22.132538448Z [inf]  Selecting previously unselected package dconf-gsettings-backend:amd64.

2025-09-05T09:50:22.135356056Z [inf]  Preparing to unpack .../038-dconf-gsettings-backend_0.40.0-4build2_amd64.deb ...

2025-09-05T09:50:22.13662272Z [inf]  Unpacking dconf-gsettings-backend:amd64 (0.40.0-4build2) ...

2025-09-05T09:50:22.154330363Z [inf]  Selecting previously unselected package libfreetype6:amd64.

2025-09-05T09:50:22.156681179Z [inf]  Preparing to unpack .../039-libfreetype6_2.13.2+dfsg-1build3_amd64.deb ...

2025-09-05T09:50:22.157867158Z [inf]  Unpacking libfreetype6:amd64 (2.13.2+dfsg-1build3) ...

2025-09-05T09:50:22.17991531Z [inf]  Selecting previously unselected package fonts-dejavu-mono.

2025-09-05T09:50:22.182311028Z [inf]  Preparing to unpack .../040-fonts-dejavu-mono_2.37-8_all.deb ...

2025-09-05T09:50:22.183768995Z [inf]  Unpacking fonts-dejavu-mono (2.37-8) ...

2025-09-05T09:50:22.208443363Z [inf]  Selecting previously unselected package fonts-dejavu-core.

2025-09-05T09:50:22.211050377Z [inf]  Preparing to unpack .../041-fonts-dejavu-core_2.37-8_all.deb ...

2025-09-05T09:50:22.227460333Z [inf]  Unpacking fonts-dejavu-core (2.37-8) ...

2025-09-05T09:50:22.259568299Z [inf]  Selecting previously unselected package fontconfig-config.

2025-09-05T09:50:22.262334062Z [inf]  Preparing to unpack .../042-fontconfig-config_2.15.0-1.1ubuntu2_amd64.deb ...

2025-09-05T09:50:22.4192732Z [inf]  Unpacking fontconfig-config (2.15.0-1.1ubuntu2) ...

2025-09-05T09:50:22.443108024Z [inf]  Selecting previously unselected package libfontconfig1:amd64.

2025-09-05T09:50:22.445809059Z [inf]  Preparing to unpack .../043-libfontconfig1_2.15.0-1.1ubuntu2_amd64.deb ...

2025-09-05T09:50:22.446918335Z [inf]  Unpacking libfontconfig1:amd64 (2.15.0-1.1ubuntu2) ...

2025-09-05T09:50:22.469316328Z [inf]  Selecting previously unselected package fontconfig.

2025-09-05T09:50:22.472560584Z [inf]  Preparing to unpack .../044-fontconfig_2.15.0-1.1ubuntu2_amd64.deb ...

2025-09-05T09:50:22.474081975Z [inf]  Unpacking fontconfig (2.15.0-1.1ubuntu2) ...

2025-09-05T09:50:22.49662919Z [inf]  Selecting previously unselected package libasound2-data.

2025-09-05T09:50:22.499043677Z [inf]  Preparing to unpack .../045-libasound2-data_1.2.11-1ubuntu0.1_all.deb ...

2025-09-05T09:50:22.500495972Z [inf]  Unpacking libasound2-data (1.2.11-1ubuntu0.1) ...

2025-09-05T09:50:22.526046528Z [inf]  Selecting previously unselected package libasound2t64:amd64.

2025-09-05T09:50:22.528629374Z [inf]  Preparing to unpack .../046-libasound2t64_1.2.11-1ubuntu0.1_amd64.deb ...

2025-09-05T09:50:22.529858066Z [inf]  Unpacking libasound2t64:amd64 (1.2.11-1ubuntu0.1) ...

2025-09-05T09:50:22.553931617Z [inf]  Selecting previously unselected package libatk1.0-0t64:amd64.

2025-09-05T09:50:22.55636954Z [inf]  Preparing to unpack .../047-libatk1.0-0t64_2.52.0-1build1_amd64.deb ...

2025-09-05T09:50:22.557754363Z [inf]  Unpacking libatk1.0-0t64:amd64 (2.52.0-1build1) ...

2025-09-05T09:50:22.577101731Z [inf]  Selecting previously unselected package libxi6:amd64.

2025-09-05T09:50:22.57985879Z [inf]  Preparing to unpack .../048-libxi6_2%3a1.8.1-1build1_amd64.deb ...

2025-09-05T09:50:22.58122282Z [inf]  Unpacking libxi6:amd64 (2:1.8.1-1build1) ...

2025-09-05T09:50:22.600287173Z [inf]  Selecting previously unselected package libatspi2.0-0t64:amd64.

2025-09-05T09:50:22.603049232Z [inf]  Preparing to unpack .../049-libatspi2.0-0t64_2.52.0-1build1_amd64.deb ...

2025-09-05T09:50:22.604495176Z [inf]  Unpacking libatspi2.0-0t64:amd64 (2.52.0-1build1) ...

2025-09-05T09:50:22.625317163Z [inf]  Selecting previously unselected package libatk-bridge2.0-0t64:amd64.

2025-09-05T09:50:22.627768071Z [inf]  Preparing to unpack .../050-libatk-bridge2.0-0t64_2.52.0-1build1_amd64.deb ...

2025-09-05T09:50:22.629108782Z [inf]  Unpacking libatk-bridge2.0-0t64:amd64 (2.52.0-1build1) ...

2025-09-05T09:50:22.647949555Z [inf]  Selecting previously unselected package libavahi-common-data:amd64.

2025-09-05T09:50:22.650557893Z [inf]  Preparing to unpack .../051-libavahi-common-data_0.8-13ubuntu6_amd64.deb ...

2025-09-05T09:50:22.651905723Z [inf]  Unpacking libavahi-common-data:amd64 (0.8-13ubuntu6) ...

2025-09-05T09:50:22.683107502Z [inf]  Selecting previously unselected package libavahi-common3:amd64.

2025-09-05T09:50:22.685782892Z [inf]  Preparing to unpack .../052-libavahi-common3_0.8-13ubuntu6_amd64.deb ...

2025-09-05T09:50:22.687590262Z [inf]  Unpacking libavahi-common3:amd64 (0.8-13ubuntu6) ...

2025-09-05T09:50:22.708582188Z [inf]  Selecting previously unselected package libavahi-client3:amd64.

2025-09-05T09:50:22.710944892Z [inf]  Preparing to unpack .../053-libavahi-client3_0.8-13ubuntu6_amd64.deb ...

2025-09-05T09:50:22.712612309Z [inf]  Unpacking libavahi-client3:amd64 (0.8-13ubuntu6) ...

2025-09-05T09:50:22.733181635Z [inf]  Selecting previously unselected package libpixman-1-0:amd64.

2025-09-05T09:50:22.735347101Z [inf]  Preparing to unpack .../054-libpixman-1-0_0.42.2-1build1_amd64.deb ...

2025-09-05T09:50:22.739911594Z [inf]  Unpacking libpixman-1-0:amd64 (0.42.2-1build1) ...

2025-09-05T09:50:22.763516504Z [inf]  Selecting previously unselected package libxcb-render0:amd64.

2025-09-05T09:50:22.765731839Z [inf]  Preparing to unpack .../055-libxcb-render0_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:22.76690433Z [inf]  Unpacking libxcb-render0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:22.784672768Z [inf]  Selecting previously unselected package libxcb-shm0:amd64.

2025-09-05T09:50:22.786830779Z [inf]  Preparing to unpack .../056-libxcb-shm0_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:22.788709825Z [inf]  Unpacking libxcb-shm0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:22.806081667Z [inf]  Selecting previously unselected package libxrender1:amd64.

2025-09-05T09:50:22.808343899Z [inf]  Preparing to unpack .../057-libxrender1_1%3a0.9.10-1.1build1_amd64.deb ...

2025-09-05T09:50:22.809576741Z [inf]  Unpacking libxrender1:amd64 (1:0.9.10-1.1build1) ...

2025-09-05T09:50:22.827998631Z [inf]  Selecting previously unselected package libcairo2:amd64.

2025-09-05T09:50:22.830255001Z [inf]  Preparing to unpack .../058-libcairo2_1.18.0-3build1_amd64.deb ...

2025-09-05T09:50:22.831735885Z [inf]  Unpacking libcairo2:amd64 (1.18.0-3build1) ...

2025-09-05T09:50:22.857268133Z [inf]  Selecting previously unselected package libcairo-gobject2:amd64.

2025-09-05T09:50:22.859502164Z [inf]  Preparing to unpack .../059-libcairo-gobject2_1.18.0-3build1_amd64.deb ...

2025-09-05T09:50:22.860871287Z [inf]  Unpacking libcairo-gobject2:amd64 (1.18.0-3build1) ...

2025-09-05T09:50:22.879653571Z [inf]  Selecting previously unselected package liblcms2-2:amd64.

2025-09-05T09:50:22.881877045Z [inf]  Preparing to unpack .../060-liblcms2-2_2.14-2build1_amd64.deb ...

2025-09-05T09:50:22.883351596Z [inf]  Unpacking liblcms2-2:amd64 (2.14-2build1) ...

2025-09-05T09:50:22.904408724Z [inf]  Selecting previously unselected package libcolord2:amd64.

2025-09-05T09:50:22.906484658Z [inf]  Preparing to unpack .../061-libcolord2_1.4.7-1build2_amd64.deb ...

2025-09-05T09:50:22.907883608Z [inf]  Unpacking libcolord2:amd64 (1.4.7-1build2) ...

2025-09-05T09:50:22.929867894Z [inf]  Selecting previously unselected package libcups2t64:amd64.

2025-09-05T09:50:22.932457495Z [inf]  Preparing to unpack .../062-libcups2t64_2.4.7-1.2ubuntu7.3_amd64.deb ...

2025-09-05T09:50:22.933646905Z [inf]  Unpacking libcups2t64:amd64 (2.4.7-1.2ubuntu7.3) ...

2025-09-05T09:50:22.955446428Z [inf]  Selecting previously unselected package libdatrie1:amd64.

2025-09-05T09:50:22.957892819Z [inf]  Preparing to unpack .../063-libdatrie1_0.2.13-3build1_amd64.deb ...

2025-09-05T09:50:22.959180304Z [inf]  Unpacking libdatrie1:amd64 (0.2.13-3build1) ...

2025-09-05T09:50:22.976986867Z [inf]  Selecting previously unselected package libdrm-amdgpu1:amd64.

2025-09-05T09:50:22.979218594Z [inf]  Preparing to unpack .../064-libdrm-amdgpu1_2.4.122-1~ubuntu0.24.04.1_amd64.deb ...

2025-09-05T09:50:22.980487229Z [inf]  Unpacking libdrm-amdgpu1:amd64 (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:22.998897076Z [inf]  Selecting previously unselected package libpciaccess0:amd64.

2025-09-05T09:50:23.001088144Z [inf]  Preparing to unpack .../065-libpciaccess0_0.17-3ubuntu0.24.04.2_amd64.deb ...

2025-09-05T09:50:23.002244972Z [inf]  Unpacking libpciaccess0:amd64 (0.17-3ubuntu0.24.04.2) ...

2025-09-05T09:50:23.020218402Z [inf]  Selecting previously unselected package libdrm-intel1:amd64.

2025-09-05T09:50:23.022333413Z [inf]  Preparing to unpack .../066-libdrm-intel1_2.4.122-1~ubuntu0.24.04.1_amd64.deb ...

2025-09-05T09:50:23.023489131Z [inf]  Unpacking libdrm-intel1:amd64 (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:23.042821996Z [inf]  Selecting previously unselected package libepoxy0:amd64.

2025-09-05T09:50:23.044966754Z [inf]  Preparing to unpack .../067-libepoxy0_1.5.10-1build1_amd64.deb ...

2025-09-05T09:50:23.046654184Z [inf]  Unpacking libepoxy0:amd64 (1.5.10-1build1) ...

2025-09-05T09:50:23.070315785Z [inf]  Selecting previously unselected package libwayland-server0:amd64.

2025-09-05T09:50:23.072609928Z [inf]  Preparing to unpack .../068-libwayland-server0_1.22.0-2.1build1_amd64.deb ...

2025-09-05T09:50:23.073909072Z [inf]  Unpacking libwayland-server0:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:23.092260703Z [inf]  Selecting previously unselected package libllvm20:amd64.

2025-09-05T09:50:23.094502883Z [inf]  Preparing to unpack .../069-libllvm20_1%3a20.1.2-0ubuntu1~24.04.2_amd64.deb ...

2025-09-05T09:50:23.09577618Z [inf]  Unpacking libllvm20:amd64 (1:20.1.2-0ubuntu1~24.04.2) ...

2025-09-05T09:50:23.626664733Z [inf]  Selecting previously unselected package libx11-xcb1:amd64.

2025-09-05T09:50:23.629248279Z [inf]  Preparing to unpack .../070-libx11-xcb1_2%3a1.8.7-1build1_amd64.deb ...

2025-09-05T09:50:23.630637936Z [inf]  Unpacking libx11-xcb1:amd64 (2:1.8.7-1build1) ...

2025-09-05T09:50:23.649457717Z [inf]  Selecting previously unselected package libxcb-dri3-0:amd64.

2025-09-05T09:50:23.651801191Z [inf]  Preparing to unpack .../071-libxcb-dri3-0_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:23.653143327Z [inf]  Unpacking libxcb-dri3-0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:23.670715839Z [inf]  Selecting previously unselected package libxcb-present0:amd64.

2025-09-05T09:50:23.673000837Z [inf]  Preparing to unpack .../072-libxcb-present0_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:23.674158116Z [inf]  Unpacking libxcb-present0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:23.691216819Z [inf]  Selecting previously unselected package libxcb-randr0:amd64.

2025-09-05T09:50:23.693297349Z [inf]  Preparing to unpack .../073-libxcb-randr0_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:23.694398991Z [inf]  Unpacking libxcb-randr0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:23.712166602Z [inf]  Selecting previously unselected package libxcb-sync1:amd64.

2025-09-05T09:50:23.714204007Z [inf]  Preparing to unpack .../074-libxcb-sync1_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:23.715413745Z [inf]  Unpacking libxcb-sync1:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:23.734054552Z [inf]  Selecting previously unselected package libxcb-xfixes0:amd64.

2025-09-05T09:50:23.73616603Z [inf]  Preparing to unpack .../075-libxcb-xfixes0_1.15-1ubuntu2_amd64.deb ...

2025-09-05T09:50:23.737317459Z [inf]  Unpacking libxcb-xfixes0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:23.754728753Z [inf]  Selecting previously unselected package libxshmfence1:amd64.

2025-09-05T09:50:23.75683268Z [inf]  Preparing to unpack .../076-libxshmfence1_1.3-1build5_amd64.deb ...

2025-09-05T09:50:23.758083829Z [inf]  Unpacking libxshmfence1:amd64 (1.3-1build5) ...

2025-09-05T09:50:23.775070536Z [inf]  Selecting previously unselected package mesa-libgallium:amd64.

2025-09-05T09:50:23.777174293Z [inf]  Preparing to unpack .../077-mesa-libgallium_25.0.7-0ubuntu0.24.04.2_amd64.deb ...

2025-09-05T09:50:23.778434941Z [inf]  Unpacking mesa-libgallium:amd64 (25.0.7-0ubuntu0.24.04.2) ...

2025-09-05T09:50:23.953019992Z [inf]  Selecting previously unselected package libgbm1:amd64.

2025-09-05T09:50:23.955487533Z [inf]  Preparing to unpack .../078-libgbm1_25.0.7-0ubuntu0.24.04.2_amd64.deb ...

2025-09-05T09:50:23.956582049Z [inf]  Unpacking libgbm1:amd64 (25.0.7-0ubuntu0.24.04.2) ...

2025-09-05T09:50:23.974177674Z [inf]  Selecting previously unselected package libgraphite2-3:amd64.

2025-09-05T09:50:23.976548416Z [inf]  Preparing to unpack .../079-libgraphite2-3_1.3.14-2build1_amd64.deb ...

2025-09-05T09:50:23.977545252Z [inf]  Unpacking libgraphite2-3:amd64 (1.3.14-2build1) ...

2025-09-05T09:50:23.99514521Z [inf]  Selecting previously unselected package libharfbuzz0b:amd64.

2025-09-05T09:50:23.997288055Z [inf]  Preparing to unpack .../080-libharfbuzz0b_8.3.0-2build2_amd64.deb ...

2025-09-05T09:50:23.998360248Z [inf]  Unpacking libharfbuzz0b:amd64 (8.3.0-2build2) ...

2025-09-05T09:50:24.020622511Z [inf]  Selecting previously unselected package libthai-data.

2025-09-05T09:50:24.022874712Z [inf]  Preparing to unpack .../081-libthai-data_0.1.29-2build1_all.deb ...

2025-09-05T09:50:24.024147153Z [inf]  Unpacking libthai-data (0.1.29-2build1) ...

2025-09-05T09:50:24.045685851Z [inf]  Selecting previously unselected package libthai0:amd64.

2025-09-05T09:50:24.048003845Z [inf]  Preparing to unpack .../082-libthai0_0.1.29-2build1_amd64.deb ...

2025-09-05T09:50:24.049287519Z [inf]  Unpacking libthai0:amd64 (0.1.29-2build1) ...

2025-09-05T09:50:24.067792051Z [inf]  Selecting previously unselected package libpango-1.0-0:amd64.

2025-09-05T09:50:24.070009349Z [inf]  Preparing to unpack .../083-libpango-1.0-0_1.52.1+ds-1build1_amd64.deb ...

2025-09-05T09:50:24.071337344Z [inf]  Unpacking libpango-1.0-0:amd64 (1.52.1+ds-1build1) ...

2025-09-05T09:50:24.098898243Z [inf]  Selecting previously unselected package libpangoft2-1.0-0:amd64.

2025-09-05T09:50:24.101043699Z [inf]  Preparing to unpack .../084-libpangoft2-1.0-0_1.52.1+ds-1build1_amd64.deb ...

2025-09-05T09:50:24.102222392Z [inf]  Unpacking libpangoft2-1.0-0:amd64 (1.52.1+ds-1build1) ...

2025-09-05T09:50:24.120830415Z [inf]  Selecting previously unselected package libpangocairo-1.0-0:amd64.

2025-09-05T09:50:24.122920151Z [inf]  Preparing to unpack .../085-libpangocairo-1.0-0_1.52.1+ds-1build1_amd64.deb ...

2025-09-05T09:50:24.124131544Z [inf]  Unpacking libpangocairo-1.0-0:amd64 (1.52.1+ds-1build1) ...

2025-09-05T09:50:24.141913051Z [inf]  Selecting previously unselected package libwayland-client0:amd64.

2025-09-05T09:50:24.14414685Z [inf]  Preparing to unpack .../086-libwayland-client0_1.22.0-2.1build1_amd64.deb ...

2025-09-05T09:50:24.145281861Z [inf]  Unpacking libwayland-client0:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:24.162816802Z [inf]  Selecting previously unselected package libwayland-cursor0:amd64.

2025-09-05T09:50:24.164933691Z [inf]  Preparing to unpack .../087-libwayland-cursor0_1.22.0-2.1build1_amd64.deb ...

2025-09-05T09:50:24.166083156Z [inf]  Unpacking libwayland-cursor0:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:24.183064101Z [inf]  Selecting previously unselected package libwayland-egl1:amd64.

2025-09-05T09:50:24.185155779Z [inf]  Preparing to unpack .../088-libwayland-egl1_1.22.0-2.1build1_amd64.deb ...

2025-09-05T09:50:24.186421975Z [inf]  Unpacking libwayland-egl1:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:24.203702696Z [inf]  Selecting previously unselected package libxcomposite1:amd64.

2025-09-05T09:50:24.20589405Z [inf]  Preparing to unpack .../089-libxcomposite1_1%3a0.4.5-1build3_amd64.deb ...

2025-09-05T09:50:24.20700348Z [inf]  Unpacking libxcomposite1:amd64 (1:0.4.5-1build3) ...

2025-09-05T09:50:24.224454914Z [inf]  Selecting previously unselected package libxfixes3:amd64.

2025-09-05T09:50:24.226493509Z [inf]  Preparing to unpack .../090-libxfixes3_1%3a6.0.0-2build1_amd64.deb ...

2025-09-05T09:50:24.227496883Z [inf]  Unpacking libxfixes3:amd64 (1:6.0.0-2build1) ...

2025-09-05T09:50:24.244011485Z [inf]  Selecting previously unselected package libxcursor1:amd64.

2025-09-05T09:50:24.246073476Z [inf]  Preparing to unpack .../091-libxcursor1_1%3a1.2.1-1build1_amd64.deb ...

2025-09-05T09:50:24.247189294Z [inf]  Unpacking libxcursor1:amd64 (1:1.2.1-1build1) ...

2025-09-05T09:50:24.264005388Z [inf]  Selecting previously unselected package libxdamage1:amd64.

2025-09-05T09:50:24.266006394Z [inf]  Preparing to unpack .../092-libxdamage1_1%3a1.1.6-1build1_amd64.deb ...

2025-09-05T09:50:24.267146468Z [inf]  Unpacking libxdamage1:amd64 (1:1.1.6-1build1) ...

2025-09-05T09:50:24.284479345Z [inf]  Selecting previously unselected package libxinerama1:amd64.

2025-09-05T09:50:24.287151238Z [inf]  Preparing to unpack .../093-libxinerama1_2%3a1.1.4-3build1_amd64.deb ...

2025-09-05T09:50:24.288267182Z [inf]  Unpacking libxinerama1:amd64 (2:1.1.4-3build1) ...

2025-09-05T09:50:24.305522556Z [inf]  Selecting previously unselected package libxrandr2:amd64.

2025-09-05T09:50:24.308048575Z [inf]  Preparing to unpack .../094-libxrandr2_2%3a1.5.2-2build1_amd64.deb ...

2025-09-05T09:50:24.309202141Z [inf]  Unpacking libxrandr2:amd64 (2:1.5.2-2build1) ...

2025-09-05T09:50:24.326054164Z [inf]  Selecting previously unselected package libgtk-3-common.

2025-09-05T09:50:24.328505033Z [inf]  Preparing to unpack .../095-libgtk-3-common_3.24.41-4ubuntu1.3_all.deb ...

2025-09-05T09:50:24.329638336Z [inf]  Unpacking libgtk-3-common (3.24.41-4ubuntu1.3) ...

2025-09-05T09:50:24.370185549Z [inf]  Selecting previously unselected package libgtk-3-0t64:amd64.

2025-09-05T09:50:24.372605261Z [inf]  Preparing to unpack .../096-libgtk-3-0t64_3.24.41-4ubuntu1.3_amd64.deb ...

2025-09-05T09:50:24.380770907Z [inf]  Unpacking libgtk-3-0t64:amd64 (3.24.41-4ubuntu1.3) ...

2025-09-05T09:50:24.441811298Z [inf]  Selecting previously unselected package libnspr4:amd64.

2025-09-05T09:50:24.444306921Z [inf]  Preparing to unpack .../097-libnspr4_2%3a4.35-1.1build1_amd64.deb ...

2025-09-05T09:50:24.445614016Z [inf]  Unpacking libnspr4:amd64 (2:4.35-1.1build1) ...

2025-09-05T09:50:24.467684276Z [inf]  Selecting previously unselected package libnss3:amd64.

2025-09-05T09:50:24.471431176Z [inf]  Preparing to unpack .../098-libnss3_2%3a3.98-1build1_amd64.deb ...

2025-09-05T09:50:24.472923042Z [inf]  Unpacking libnss3:amd64 (2:3.98-1build1) ...

2025-09-05T09:50:24.516401611Z [inf]  Selecting previously unselected package x11-common.

2025-09-05T09:50:24.520122311Z [inf]  Preparing to unpack .../099-x11-common_1%3a7.7+23ubuntu3_all.deb ...

2025-09-05T09:50:24.522726971Z [inf]  Unpacking x11-common (1:7.7+23ubuntu3) ...

2025-09-05T09:50:24.544315593Z [inf]  Selecting previously unselected package libxss1:amd64.

2025-09-05T09:50:24.546621738Z [inf]  Preparing to unpack .../100-libxss1_1%3a1.2.3-1build3_amd64.deb ...

2025-09-05T09:50:24.547826802Z [inf]  Unpacking libxss1:amd64 (1:1.2.3-1build3) ...

2025-09-05T09:50:24.566064748Z [inf]  Selecting previously unselected package libglvnd0:amd64.

2025-09-05T09:50:24.568224019Z [inf]  Preparing to unpack .../101-libglvnd0_1.7.0-1build1_amd64.deb ...

2025-09-05T09:50:24.569427181Z [inf]  Unpacking libglvnd0:amd64 (1.7.0-1build1) ...

2025-09-05T09:50:24.590731691Z [inf]  Selecting previously unselected package libopengl0:amd64.

2025-09-05T09:50:24.592868492Z [inf]  Preparing to unpack .../102-libopengl0_1.7.0-1build1_amd64.deb ...

2025-09-05T09:50:24.594053446Z [inf]  Unpacking libopengl0:amd64 (1.7.0-1build1) ...

2025-09-05T09:50:24.612244782Z [inf]  Selecting previously unselected package libglu1-mesa:amd64.

2025-09-05T09:50:24.614308413Z [inf]  Preparing to unpack .../103-libglu1-mesa_9.0.2-1.1build1_amd64.deb ...

2025-09-05T09:50:24.615530787Z [inf]  Unpacking libglu1-mesa:amd64 (9.0.2-1.1build1) ...

2025-09-05T09:50:24.642761731Z [inf]  Setting up libgraphite2-3:amd64 (1.3.14-2build1) ...

2025-09-05T09:50:24.646391336Z [inf]  Setting up liblcms2-2:amd64 (2.14-2build1) ...

2025-09-05T09:50:24.649468759Z [inf]  Setting up libpixman-1-0:amd64 (0.42.2-1build1) ...

2025-09-05T09:50:24.652845398Z [inf]  Setting up libsharpyuv0:amd64 (1.3.2-0.4build3) ...

2025-09-05T09:50:24.65621586Z [inf]  Setting up libwayland-server0:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:24.659543259Z [inf]  Setting up libpciaccess0:amd64 (0.17-3ubuntu0.24.04.2) ...

2025-09-05T09:50:24.662860845Z [inf]  Setting up libxau6:amd64 (1:1.0.9-1build6) ...

2025-09-05T09:50:24.666279724Z [inf]  Setting up libxdmcp6:amd64 (1:1.1.3-0ubuntu6) ...

2025-09-05T09:50:24.66970247Z [inf]  Setting up libxcb1:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.673142421Z [inf]  Setting up libxcb-xfixes0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.676285953Z [inf]  Setting up liblerc4:amd64 (4.0.0+ds-4ubuntu2) ...

2025-09-05T09:50:24.679581508Z [inf]  Setting up hicolor-icon-theme (0.17-2) ...

2025-09-05T09:50:24.693249398Z [inf]  Setting up libdatrie1:amd64 (0.2.13-3build1) ...

2025-09-05T09:50:24.69634051Z [inf]  Setting up libxcb-render0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.699399272Z [inf]  Setting up libglvnd0:amd64 (1.7.0-1build1) ...

2025-09-05T09:50:24.702867049Z [inf]  Setting up libsqlite3-0:amd64 (3.45.1-1ubuntu2.4) ...

2025-09-05T09:50:24.706277598Z [inf]  Setting up libgdk-pixbuf2.0-common (2.42.10+dfsg-3ubuntu3.2) ...

2025-09-05T09:50:24.709755791Z [inf]  Setting up x11-common (1:7.7+23ubuntu3) ...

2025-09-05T09:50:24.793595837Z [inf]  debconf: unable to initialize frontend: Dialog
debconf: (Dialog frontend will not work on a dumb terminal, an emacs shell buffer, or without a controlling terminal.)
debconf: falling back to frontend: Readline

2025-09-05T09:50:24.800226273Z [inf]  debconf: unable to initialize frontend: Readline
debconf: (This frontend requires a controlling tty.)
debconf: falling back to frontend: Teletype

2025-09-05T09:50:24.820590828Z [inf]  invoke-rc.d: could not determine current runlevel

2025-09-05T09:50:24.825066131Z [inf]  invoke-rc.d: policy-rc.d denied execution of start.

2025-09-05T09:50:24.829521702Z [inf]  Setting up libsensors-config (1:3.6.0-9build1) ...

2025-09-05T09:50:24.83502139Z [inf]  Setting up libdeflate0:amd64 (1.19-1build1.1) ...

2025-09-05T09:50:24.838209001Z [inf]  Setting up xkb-data (2.41-2ubuntu1.1) ...

2025-09-05T09:50:24.841294864Z [inf]  Setting up libxcb-shm0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.844835842Z [inf]  Setting up libjbig0:amd64 (2.1-6.1ubuntu2) ...

2025-09-05T09:50:24.848231073Z [inf]  Setting up libopengl0:amd64 (1.7.0-1build1) ...

2025-09-05T09:50:24.8511289Z [inf]  Setting up libelf1t64:amd64 (0.190-1.1ubuntu0.1) ...

2025-09-05T09:50:24.854200782Z [inf]  Setting up libxcb-present0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.857184752Z [inf]  Setting up libasound2-data (1.2.11-1ubuntu0.1) ...

2025-09-05T09:50:24.860254413Z [inf]  Setting up libglib2.0-0t64:amd64 (2.80.0-6ubuntu3.4) ...

2025-09-05T09:50:24.870095703Z [inf]  Setting up libasound2t64:amd64 (1.2.11-1ubuntu0.1) ...

2025-09-05T09:50:24.873150878Z [inf]  Setting up libx11-data (2:1.8.7-1build1) ...

2025-09-05T09:50:24.876196336Z [inf]  Setting up libepoxy0:amd64 (1.5.10-1build1) ...

2025-09-05T09:50:24.879221045Z [inf]  Setting up libnspr4:amd64 (2:4.35-1.1build1) ...

2025-09-05T09:50:24.882270795Z [inf]  Setting up libxcb-sync1:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.885322114Z [inf]  Setting up libavahi-common-data:amd64 (0.8-13ubuntu6) ...

2025-09-05T09:50:24.888394286Z [inf]  Setting up libfribidi0:amd64 (1.0.13-3build1) ...

2025-09-05T09:50:24.891452191Z [inf]  Setting up fonts-dejavu-mono (2.37-8) ...

2025-09-05T09:50:24.898953888Z [inf]  Setting up libpng16-16t64:amd64 (1.6.43-5build1) ...

2025-09-05T09:50:24.902037364Z [inf]  Setting up fonts-dejavu-core (2.37-8) ...

2025-09-05T09:50:24.928714274Z [inf]  Setting up libsensors5:amd64 (1:3.6.0-9build1) ...

2025-09-05T09:50:24.932038047Z [inf]  Setting up libjpeg-turbo8:amd64 (2.1.5-2ubuntu2) ...

2025-09-05T09:50:24.935549496Z [inf]  Setting up libwebp7:amd64 (1.3.2-0.4build3) ...

2025-09-05T09:50:24.938749108Z [inf]  Setting up libicu74:amd64 (74.2-1ubuntu3.1) ...

2025-09-05T09:50:24.942015247Z [inf]  Setting up libxshmfence1:amd64 (1.3-1build5) ...

2025-09-05T09:50:24.945239004Z [inf]  Setting up chromium-browser (2:1snap1-0ubuntu2) ...

2025-09-05T09:50:24.949201752Z [inf]  update-alternatives: using /usr/bin/chromium-browser to provide /usr/bin/x-www-browser (x-www-browser) in auto mode

2025-09-05T09:50:24.951170353Z [inf]  update-alternatives: using /usr/bin/chromium-browser to provide /usr/bin/gnome-www-browser (gnome-www-browser) in auto mode

2025-09-05T09:50:24.958622233Z [inf]  Setting up at-spi2-common (2.52.0-1build1) ...

2025-09-05T09:50:24.961754554Z [inf]  Setting up libxcb-randr0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.964930248Z [inf]  Setting up libx11-6:amd64 (2:1.8.7-1build1) ...

2025-09-05T09:50:24.968193268Z [inf]  Setting up libthai-data (0.1.29-2build1) ...

2025-09-05T09:50:24.971318442Z [inf]  Setting up libglu1-mesa:amd64 (9.0.2-1.1build1) ...

2025-09-05T09:50:24.974403772Z [inf]  Setting up libwayland-egl1:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:24.977826543Z [inf]  Setting up libdrm-common (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:24.981113831Z [inf]  Setting up libxcomposite1:amd64 (1:0.4.5-1build3) ...

2025-09-05T09:50:24.984163637Z [inf]  Setting up libxml2:amd64 (2.9.14+dfsg-1.3ubuntu3.4) ...

2025-09-05T09:50:24.987422411Z [inf]  Setting up libxkbcommon0:amd64 (1.6.0-1build1) ...

2025-09-05T09:50:24.990507916Z [inf]  Setting up libwayland-client0:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:24.993464271Z [inf]  Setting up libjpeg8:amd64 (8c-2ubuntu11) ...

2025-09-05T09:50:24.996503697Z [inf]  Setting up libxcb-dri3-0:amd64 (1.15-1ubuntu2) ...

2025-09-05T09:50:24.999575366Z [inf]  Setting up libx11-xcb1:amd64 (2:1.8.7-1build1) ...

2025-09-05T09:50:25.002460765Z [inf]  Setting up libxdamage1:amd64 (1:1.1.6-1build1) ...

2025-09-05T09:50:25.005344005Z [inf]  Setting up libatk1.0-0t64:amd64 (2.52.0-1build1) ...

2025-09-05T09:50:25.008389223Z [inf]  Setting up libxrender1:amd64 (1:0.9.10-1.1build1) ...

2025-09-05T09:50:25.011370478Z [inf]  Setting up fontconfig-config (2.15.0-1.1ubuntu2) ...

2025-09-05T09:50:25.175858407Z [inf]  Setting up libavahi-common3:amd64 (0.8-13ubuntu6) ...

2025-09-05T09:50:25.179162684Z [inf]  Setting up libxext6:amd64 (2:1.3.4-1build2) ...

2025-09-05T09:50:25.182467273Z [inf]  Setting up libnss3:amd64 (2:3.98-1build1) ...

2025-09-05T09:50:25.18551163Z [inf]  Setting up libcolord2:amd64 (1.4.7-1build2) ...

2025-09-05T09:50:25.188648615Z [inf]  Setting up libdconf1:amd64 (0.40.0-4build2) ...

2025-09-05T09:50:25.191837942Z [inf]  Setting up libthai0:amd64 (0.1.29-2build1) ...

2025-09-05T09:50:25.195108971Z [inf]  Setting up libfreetype6:amd64 (2.13.2+dfsg-1build3) ...

2025-09-05T09:50:25.198483835Z [inf]  Setting up libxfixes3:amd64 (1:6.0.0-2build1) ...

2025-09-05T09:50:25.20191334Z [inf]  Setting up shared-mime-info (2.4-4) ...

2025-09-05T09:50:25.971842125Z [inf]  Setting up libxinerama1:amd64 (2:1.1.4-3build1) ...

2025-09-05T09:50:25.975286308Z [inf]  Setting up libxrandr2:amd64 (2:1.5.2-2build1) ...

2025-09-05T09:50:25.978817024Z [inf]  Setting up libllvm20:amd64 (1:20.1.2-0ubuntu1~24.04.2) ...

2025-09-05T09:50:25.989391032Z [inf]  Setting up libdrm2:amd64 (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:25.992615035Z [inf]  Setting up libtiff6:amd64 (4.5.1+git230720-4ubuntu2.3) ...

2025-09-05T09:50:25.995480416Z [inf]  Setting up libwayland-cursor0:amd64 (1.22.0-2.1build1) ...

2025-09-05T09:50:25.998656049Z [inf]  Setting up libharfbuzz0b:amd64 (8.3.0-2build2) ...

2025-09-05T09:50:26.001901784Z [inf]  Setting up libgdk-pixbuf-2.0-0:amd64 (2.42.10+dfsg-3ubuntu3.2) ...

2025-09-05T09:50:26.019272109Z [inf]  Setting up libxss1:amd64 (1:1.2.3-1build3) ...

2025-09-05T09:50:26.022124379Z [inf]  Setting up libfontconfig1:amd64 (2.15.0-1.1ubuntu2) ...

2025-09-05T09:50:26.024859909Z [inf]  Setting up libavahi-client3:amd64 (0.8-13ubuntu6) ...

2025-09-05T09:50:26.02738656Z [inf]  Setting up libdrm-amdgpu1:amd64 (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:26.029830075Z [inf]  Setting up gtk-update-icon-cache (3.24.41-4ubuntu1.3) ...

2025-09-05T09:50:26.032289632Z [inf]  Setting up fontconfig (2.15.0-1.1ubuntu2) ...

2025-09-05T09:50:26.036127584Z [inf]  Regenerating fonts cache... 
2025-09-05T09:50:28.05176839Z [inf]  done.

2025-09-05T09:50:28.053879876Z [inf]  Setting up libxi6:amd64 (2:1.8.1-1build1) ...

2025-09-05T09:50:28.056502291Z [inf]  Setting up libxcursor1:amd64 (1:1.2.1-1build1) ...

2025-09-05T09:50:28.058804426Z [inf]  Setting up libpango-1.0-0:amd64 (1.52.1+ds-1build1) ...

2025-09-05T09:50:28.061239733Z [inf]  Setting up libdrm-intel1:amd64 (2.4.122-1~ubuntu0.24.04.1) ...

2025-09-05T09:50:28.063731596Z [inf]  Setting up dconf-service (0.40.0-4build2) ...

2025-09-05T09:50:28.06628645Z [inf]  Setting up libcairo2:amd64 (1.18.0-3build1) ...

2025-09-05T09:50:28.068745728Z [inf]  Setting up libatspi2.0-0t64:amd64 (2.52.0-1build1) ...

2025-09-05T09:50:28.071049826Z [inf]  Setting up libcairo-gobject2:amd64 (1.18.0-3build1) ...

2025-09-05T09:50:28.073330609Z [inf]  Setting up libpangoft2-1.0-0:amd64 (1.52.1+ds-1build1) ...

2025-09-05T09:50:28.076296344Z [inf]  Setting up libcups2t64:amd64 (2.4.7-1.2ubuntu7.3) ...

2025-09-05T09:50:28.078685394Z [inf]  Setting up libpangocairo-1.0-0:amd64 (1.52.1+ds-1build1) ...

2025-09-05T09:50:28.081015746Z [inf]  Setting up libatk-bridge2.0-0t64:amd64 (2.52.0-1build1) ...

2025-09-05T09:50:28.083322265Z [inf]  Setting up mesa-libgallium:amd64 (25.0.7-0ubuntu0.24.04.2) ...

2025-09-05T09:50:28.085707417Z [inf]  Setting up dconf-gsettings-backend:amd64 (0.40.0-4build2) ...

2025-09-05T09:50:28.087867413Z [inf]  Setting up libgbm1:amd64 (25.0.7-0ubuntu0.24.04.2) ...

2025-09-05T09:50:28.090151527Z [inf]  Setting up libgtk-3-common (3.24.41-4ubuntu1.3) ...

2025-09-05T09:50:28.093902668Z [inf]  Setting up adwaita-icon-theme (46.0-1) ...

2025-09-05T09:50:28.10738458Z [inf]  update-alternatives: using /usr/share/icons/Adwaita/cursor.theme to provide /usr/share/icons/default/index.theme (x-cursor-theme) in auto mode

2025-09-05T09:50:28.109815641Z [inf]  Setting up libgtk-3-0t64:amd64 (3.24.41-4ubuntu1.3) ...

2025-09-05T09:50:28.128742589Z [inf]  Setting up humanity-icon-theme (0.6.16) ...

2025-09-05T09:50:28.277981464Z [inf]  Setting up ubuntu-mono (24.04-0ubuntu1) ...

2025-09-05T09:50:28.311982469Z [inf]  Processing triggers for libc-bin (2.39-0ubuntu8.4) ...

2025-09-05T09:50:28.530820228Z [inf]  [stage-0  5/12] RUN sudo apt-get update && sudo apt-get install -y --no-install-recommends libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2t64 libpangocairo-1.0-0 libxss1 libgtk-3-0 libxshmfence1 libglu1 chromium
2025-09-05T09:50:28.541698189Z [inf]  [stage-0  6/12] COPY . /app/.
2025-09-05T09:50:28.812421286Z [inf]  [stage-0  6/12] COPY . /app/.
2025-09-05T09:50:28.814635162Z [inf]  [stage-0  7/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 npm install -g corepack@0.24.1 && corepack enable
2025-09-05T09:50:29.041020051Z [inf]  npm warn config production Use `--omit=dev` instead.

2025-09-05T09:50:29.621054406Z [inf]  
changed 1 package in 608ms

2025-09-05T09:50:29.754128980Z [inf]  [stage-0  7/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 npm install -g corepack@0.24.1 && corepack enable
2025-09-05T09:50:29.755020545Z [inf]  [stage-0  8/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm i --frozen-lockfile
2025-09-05T09:50:31.124416997Z [inf]  Scope: all 38 workspace projects

2025-09-05T09:50:31.23296944Z [inf]  Lockfile is up to date, resolution step is skipped

2025-09-05T09:50:31.324995371Z [inf]  Progress: resolved 1, reused 0, downloaded 0, added 0

2025-09-05T09:50:31.58930471Z [inf]  Packages: +1531
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

2025-09-05T09:50:32.336646593Z [inf]  Progress: resolved 1531, reused 0, downloaded 155, added 50

2025-09-05T09:50:33.345000558Z [inf]  Progress: resolved 1531, reused 0, downloaded 832, added 568

2025-09-05T09:50:34.346461019Z [inf]  Progress: resolved 1531, reused 0, downloaded 1436, added 944

2025-09-05T09:50:35.304103475Z [inf]  Progress: resolved 1531, reused 0, downloaded 1531, added 1531, done

2025-09-05T09:50:35.481441265Z [inf]   WARN  Failed to create bin at /app/node_modules/.pnpm/node_modules/.bin/supabase. ENOENT: no such file or directory, open '/app/node_modules/.pnpm/node_modules/supabase/bin/supabase'

2025-09-05T09:50:35.824431361Z [inf]   WARN  Failed to create bin at /app/node_modules/.pnpm/supabase@2.39.2/node_modules/supabase/node_modules/.bin/supabase. ENOENT: no such file or directory, open '/app/node_modules/.pnpm/supabase@2.39.2/node_modules/supabase/bin/supabase'

2025-09-05T09:50:35.827426631Z [inf]  .../node_modules/supabase postinstall$ node scripts/postinstall.js

2025-09-05T09:50:35.868224572Z [inf]  .../node_modules/@tailwindcss/oxide postinstall$ node ./scripts/install.js

2025-09-05T09:50:35.894372297Z [inf]  .../node_modules/@sentry/cli postinstall$ node ./scripts/install.js

2025-09-05T09:50:35.968854035Z [inf]  .../node_modules/@tailwindcss/oxide postinstall: Done

2025-09-05T09:50:35.986777216Z [inf]  .../node_modules/@sentry/cli postinstall: Done

2025-09-05T09:50:35.997970075Z [inf]  .../node_modules/supabase postinstall: Downloading https://github.com/supabase/cli/releases/download/v2.39.2/supabase_2.39.2_checksums.txt

2025-09-05T09:50:36.053362826Z [inf]  .../node_modules/supabase postinstall: Downloading https://github.com/supabase/cli/releases/download/v2.39.2/supabase_linux_amd64.tar.gz

2025-09-05T09:50:36.516415783Z [inf]  .../node_modules/supabase postinstall: Checksum verified.

2025-09-05T09:50:36.518959768Z [inf]  .../node_modules/supabase postinstall: Installed Supabase CLI successfully

2025-09-05T09:50:36.528969127Z [inf]  .../node_modules/supabase postinstall: Done

2025-09-05T09:50:37.459756908Z [inf]  
devDependencies:
+ @manypkg/cli 0.25.1
+ @turbo/gen 2.5.6
+ @types/node 24.3.1
+ cross-env 10.0.0
+ glob 11.0.3
+ prettier 3.6.2
+ puppeteer 24.19.0
+ turbo 2.5.6
+ typescript 5.9.2

╭ Warning ─────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Ignored build scripts: core-js-pure, esbuild, protobufjs, puppeteer,       │
│   unrs-resolver.                                                             │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯


2025-09-05T09:50:37.485395045Z [inf]  . postinstall$ manypkg fix

2025-09-05T09:50:37.670341684Z [inf]  . postinstall: ☔️ [32msuccess[39m fixed workspaces!

2025-09-05T09:50:37.682245608Z [inf]  . postinstall: Done

2025-09-05T09:50:38.590568381Z [inf]  Done in 7.9s using pnpm v10.15.0

2025-09-05T09:50:39.028193780Z [inf]  [stage-0  8/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-/root/local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm i --frozen-lockfile
2025-09-05T09:50:39.032740702Z [inf]  [stage-0  9/12] COPY . /app/.
2025-09-05T09:50:40.486299439Z [inf]  [stage-0  9/12] COPY . /app/.
2025-09-05T09:50:40.488670590Z [inf]  [stage-0 10/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-node_modules/cache,target=/app/node_modules/.cache pnpm install && pnpm build
2025-09-05T09:50:41.047418021Z [inf]  Scope: all 38 workspace projects

2025-09-05T09:50:41.269380801Z [inf]  Lockfile is up to date, resolution step is skipped

2025-09-05T09:50:41.447292053Z [inf]  Already up to date

2025-09-05T09:50:42.794960188Z [inf]  
╭ Warning ─────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Ignored build scripts: core-js-pure, esbuild, protobufjs, puppeteer,       │
│   unrs-resolver.                                                             │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯


2025-09-05T09:50:42.814641142Z [inf]  . postinstall$ manypkg fix

2025-09-05T09:50:42.955198658Z [inf]  . postinstall: ☔️ [32msuccess[39m fixed workspaces!

2025-09-05T09:50:42.965489178Z [inf]  . postinstall: Done

2025-09-05T09:50:43.517181305Z [inf]  Done in 2.8s using pnpm v10.15.0

2025-09-05T09:50:43.928230306Z [inf]  
> react-router-supabase-saas-kit-turbo@1.0.1 build /app
> turbo build --cache-dir=.turbo


2025-09-05T09:50:44.03720293Z [inf]  
Attention:
Turborepo now collects completely anonymous telemetry regarding usage.
This information is used to shape the Turborepo roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://turborepo.com/docs/telemetry


2025-09-05T09:50:44.193424996Z [inf]  • Packages in scope: @kit/accounts, @kit/admin, @kit/analytics, @kit/auth, @kit/baselime, @kit/billing, @kit/billing-gateway, @kit/cms, @kit/cms-types, @kit/csrf, @kit/database-webhooks, @kit/email-templates, @kit/eslint-config, @kit/i18n, @kit/keystatic, @kit/lemon-squeezy, @kit/mailers, @kit/mailers-shared, @kit/monitoring, @kit/monitoring-core, @kit/nodemailer, @kit/notifications, @kit/otp, @kit/prettier-config, @kit/resend, @kit/sentry, @kit/shared, @kit/stripe, @kit/supabase, @kit/tailwind-config, @kit/team-accounts, @kit/tsconfig, @kit/ui, @kit/wordpress, scripts, web, web-e2e
• Running build in 37 packages
• Remote caching disabled

2025-09-05T09:50:44.512957377Z [inf]  web:build: cache miss, executing 0bf706bbb1a43905

2025-09-05T09:50:44.903181354Z [inf]  web:build: 
web:build: > web@ build /app/apps/web
web:build: > cross-env NODE_ENV=production react-router build
web:build: 

2025-09-05T09:50:46.234174496Z [inf]  web:build: [36mvite v7.1.4 [32mbuilding for production...[36m[39m

2025-09-05T09:50:46.352995237Z [inf]  web:build: transforming...

2025-09-05T09:50:48.522470214Z [inf]  web:build: [33mapp/routes/home/account/_components/dashboard-demo.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:49.329921875Z [inf]  web:build: [33mapp/routes/home/user/_components/home-account-selector.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:49.333518548Z [inf]  web:build: [33mapp/routes/home/account/_components/team-account-accounts-selector.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:49.33522529Z [inf]  web:build: [33mapp/routes/marketing/docs/_components/floating-docs-navigation.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.380445891Z [inf]  web:build: [33m../../packages/ui/src/shadcn/label.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.393222301Z [inf]  web:build: [33m../../packages/ui/src/shadcn/select.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.690477688Z [inf]  web:build: [33m../../packages/ui/src/shadcn/separator.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.829307746Z [inf]  web:build: [33m../../packages/features/auth/src/components/sign-up-methods-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.834197204Z [inf]  web:build: [33m../../packages/features/auth/src/components/password-reset-request-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.836956174Z [inf]  web:build: [33m../../packages/features/auth/src/components/update-password-form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.840766086Z [inf]  web:build: [33m../../packages/ui/src/shadcn/form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.842595286Z [inf]  web:build: [33m../../packages/ui/src/shadcn/collapsible.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.84593548Z [inf]  web:build: [33m../../packages/ui/src/makerkit/bordered-navigation-menu.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:51.848522143Z [inf]  web:build: [33m../../packages/ui/src/shadcn/dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.075753472Z [inf]  web:build: [33m../../packages/ui/src/shadcn/tooltip.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.076983904Z [inf]  web:build: [33m../../packages/features/admin/src/components/admin-memberships-table.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.077741721Z [inf]  web:build: [33m../../packages/features/admin/src/components/admin-delete-account-dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.079647769Z [inf]  web:build: [33m../../packages/features/admin/src/components/admin-members-table.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.080481451Z [inf]  web:build: [33m../../packages/features/admin/src/components/admin-delete-user-dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.081692153Z [inf]  web:build: [33m../../packages/features/admin/src/components/admin-reactivate-user-dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.095222243Z [inf]  web:build: [33m../../packages/ui/src/shadcn/sheet.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.096435033Z [inf]  web:build: [33m../../packages/features/admin/src/components/admin-ban-user-dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.100807916Z [inf]  web:build: [33m../../packages/ui/src/makerkit/data-table.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.111388223Z [inf]  web:build: [33m../../packages/features/accounts/src/components/account-selector.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.114748872Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/members/invite-members-dialog-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.296110464Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/settings/team-account-settings-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.298937313Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/invitations/account-invitations-table.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.301672892Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/settings/team-account-danger-zone.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.307162885Z [inf]  web:build: [33m../../packages/features/auth/src/components/password-sign-up-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.308886936Z [inf]  web:build: [33m../../packages/features/auth/src/components/password-sign-in-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.310317976Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/members/account-members-table.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.319939708Z [inf]  web:build: [33m../../packages/features/auth/src/components/magic-link-auth-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.324375076Z [inf]  web:build: [33m../../packages/features/auth/src/components/oauth-providers.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.325943338Z [inf]  web:build: [33m../../packages/ui/src/shadcn/input-otp.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.327513363Z [inf]  web:build: [33m../../packages/ui/src/shadcn/navigation-menu.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.350758111Z [inf]  web:build: [33m../../packages/shared/src/events/index.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.352092814Z [inf]  web:build: [33m../../packages/features/auth/src/captcha/client/captcha-token-setter.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.529892776Z [inf]  web:build: [33m../../packages/features/auth/src/captcha/client/captcha-provider.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.83226392Z [inf]  web:build: [33m../../packages/billing/gateway/src/components/billing-portal-card.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.835364161Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/account-settings-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.838032007Z [inf]  web:build: [33m../../packages/ui/src/shadcn/avatar.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.842182402Z [inf]  web:build: [33m../../packages/ui/src/shadcn/popover.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.843393311Z [inf]  web:build: [33m../../packages/ui/src/shadcn/alert-dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.853333794Z [inf]  web:build: [33m../../packages/ui/src/shadcn/command.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.858018714Z [inf]  web:build: [33m../../packages/billing/gateway/src/components/plan-picker.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.863286862Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/invitations/sign-out-invitation-button.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.874654629Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/settings/update-team-account-name-form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.88133007Z [inf]  web:build: [33m../../packages/ui/src/shadcn/data-table.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.882422064Z [inf]  web:build: [33m../../packages/features/auth/src/components/password-sign-up-form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.905703364Z [inf]  web:build: [33m../../packages/features/auth/src/components/password-sign-in-form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:52.907281959Z [inf]  web:build: [33m../../packages/features/team-accounts/src/components/members/transfer-ownership-dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.184477834Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/update-account-details-form-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.185284944Z [inf]  web:build: [33m../../packages/ui/src/makerkit/language-selector.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.187686606Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/account-danger-zone.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.191026667Z [inf]  web:build: [33m../../packages/ui/src/shadcn/radio-group.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.2125331Z [inf]  web:build: [33m../../packages/ui/src/shadcn/checkbox.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.213645232Z [inf]  web:build: [33m../../packages/billing/gateway/src/components/line-item-details.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.216904093Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/email/update-email-form-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.217762319Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/password/update-password-container.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.218894204Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/mfa/multi-factor-auth-list.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.548403593Z [inf]  web:build: [33m../../packages/features/notifications/src/components/notifications-popover.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.552690949Z [inf]  web:build: [33m../../packages/billing/lemon-squeezy/src/components/lemon-squeezy-embedded-checkout.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.553552043Z [inf]  web:build: [33m../../packages/ui/src/makerkit/image-upload-input.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.555482545Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/password/update-password-form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.558334975Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/email/update-email-form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.60462752Z [inf]  web:build: [33m../../packages/features/accounts/src/components/personal-account-settings/mfa/multi-factor-auth-setup-dialog.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:53.709220528Z [inf]  web:build: [33m../../packages/otp/src/components/verify-otp-form.tsx (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:55.415900973Z [inf]  web:build: [33m[plugin vite:resolve] Module "node:process" has been externalized for browser compatibility, imported by "/app/packages/cms/keystatic/src/create-reader.ts". See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.[39m

2025-09-05T09:50:55.41634015Z [inf]  web:build: [33m[plugin vite:resolve] Module "node:process" has been externalized for browser compatibility, imported by "/app/packages/cms/keystatic/src/create-reader.ts". See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.[39m

2025-09-05T09:50:55.970944191Z [inf]  web:build: [33m[plugin vite:resolve] Module "node:path" has been externalized for browser compatibility, imported by "/app/node_modules/.pnpm/@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/@keystatic/core/dist/keystatic-core-reader.js". See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.[39m

2025-09-05T09:50:55.971016322Z [inf]  web:build: [33m[plugin vite:resolve] Module "node:fs/promises" has been externalized for browser compatibility, imported by "/app/node_modules/.pnpm/@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/@keystatic/core/dist/keystatic-core-reader.js". See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.[39m

2025-09-05T09:50:55.97531105Z [inf]  web:build: [33m[plugin vite:resolve] Module "node:path" has been externalized for browser compatibility, imported by "/app/node_modules/.pnpm/@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/@keystatic/core/dist/keystatic-core-reader.js". See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.[39m

2025-09-05T09:50:55.975391498Z [inf]  web:build: [33m[plugin vite:resolve] Module "node:fs/promises" has been externalized for browser compatibility, imported by "/app/node_modules/.pnpm/@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/@keystatic/core/dist/keystatic-core-reader.js". See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.[39m

2025-09-05T09:50:57.095699121Z [inf]  web:build: [33m../../packages/monitoring/core/src/monitoring.context.ts (1:0): Error when using sourcemap for reporting an error: Can't resolve original location of error.[39m

2025-09-05T09:50:57.768023861Z [inf]  web:build: [32m✓[39m 5060 modules transformed.

2025-09-05T09:50:57.785928304Z [inf]  web:build: [31m✗[39m Build failed in 11.52s

2025-09-05T09:50:57.787143727Z [inf]  web:build: [31m[vite]: Rollup failed to resolve import "~/components/app-logo" from "/app/apps/web/app/routes/update-password.tsx".
web:build: This is most likely unintended because it can break your application at runtime.
web:build: If you do want to externalize this module explicitly add it to
web:build: `build.rollupOptions.external`[39m
web:build:     at viteLog (file:///app/node_modules/.pnpm/vite@7.1.4_@types+node@24.3.1_jiti@2.5.1_lightningcss@1.30.1_tsx@4.20.5/node_modules/vite/dist/node/chunks/dep-C6pp_iVS.js:34335:57)
web:build:     at file:///app/node_modules/.pnpm/vite@7.1.4_@types+node@24.3.1_jiti@2.5.1_lightningcss@1.30.1_tsx@4.20.5/node_modules/vite/dist/node/chunks/dep-C6pp_iVS.js:34373:73
web:build:     at onwarn (/app/node_modules/.pnpm/@react-router+dev@7.8.2_@react-router+serve@7.8.2_react-router@7.8.2_react-dom@19.1.1_r_10d431edeb53b56084f53f636df7dd8f/node_modules/@react-router/dev/dist/cli/index.js:1528:11)
web:build:     at file:///app/node_modules/.pnpm/vite@7.1.4_@types+node@24.3.1_jiti@2.5.1_lightningcss@1.30.1_tsx@4.20.5/node_modules/vite/dist/node/chunks/dep-C6pp_iVS.js:34373:28
web:build:     at onRollupLog (file:///app/node_modules/.pnpm/vite@7.1.4_@types+node@24.3.1_jiti@2.5.1_lightningcss@1.30.1_tsx@4.20.5/node_modules/vite/dist/node/chunks/dep-C6pp_iVS.js:34368:3)
web:build:     at onLog (file:///app/node_modules/.pnpm/vite@7.1.4_@types+node@24.3.1_jiti@2.5.1_lightningcss@1.30.1_tsx@4.20.5/node_modules/vite/dist/node/chunks/dep-C6pp_iVS.js:34164:4)
web:build:     at file:///app/node_modules/.pnpm/rollup@4.50.0/node_modules/rollup/dist/es/shared/node-entry.js:20906:32
web:build:     at Object.logger [as onLog] (file:///app/node_modules/.pnpm/rollup@4.50.0/node_modules/rollup/dist/es/shared/node-entry.js:22792:9)
web:build:     at ModuleLoader.handleInvalidResolvedId (file:///app/node_modules/.pnpm/rollup@4.50.0/node_modules/rollup/dist/es/shared/node-entry.js:21536:26)
web:build:     at file:///app/node_modules/.pnpm/rollup@4.50.0/node_modules/rollup/dist/es/shared/node-entry.js:21494:26 {

2025-09-05T09:50:57.787195317Z [inf]  web:build:   watchFiles: [
web:build:     '/app/apps/web/app/root.tsx',
web:build:     '/app/apps/web/app/routes/robots/route.tsx',
web:build:     '/app/apps/web/app/routes/version.ts',
web:build:     '/app/apps/web/app/routes/sitemap/route.tsx',
web:build:     '/app/apps/web/app/routes/healthcheck.ts',
web:build:     '/app/apps/web/app/routes/join.tsx',
web:build:     '/app/apps/web/app/routes/update-password.tsx',
web:build:     '/app/apps/web/app/routes/api/accounts.ts',
web:build:     '/app/apps/web/app/routes/api/billing/checkout.ts',
web:build:     '/app/apps/web/app/routes/api/billing/webhook.ts',
web:build:     '/app/apps/web/app/routes/api/db/webhook.ts',
web:build:     '/app/apps/web/app/routes/api/otp/send.ts',
web:build:     '/app/apps/web/app/routes/magic-patterns/layout.tsx',
web:build:     '/app/apps/web/app/routes/advertise/index.tsx',
web:build:     '/app/apps/web/app/routes/index.tsx',
web:build:     '/app/apps/web/app/routes/about/index.tsx',
web:build:     '/app/apps/web/app/routes/advertise/email-campaigns/index.tsx',
web:build:     '/app/apps/web/app/routes/advertise/packages/index.tsx',
web:build:     '/app/apps/web/app/routes/advertise/featured-listings/index.tsx',
web:build:     '/app/apps/web/app/routes/advertise/event-promotion/index.tsx',

2025-09-05T09:50:57.78720486Z [inf]  web:build:     '/app/apps/web/app/routes/advertise/homepage-showcase/index.tsx',
web:build:     '/app/apps/web/app/routes/advertising-solutions/index.tsx',
web:build:     '/app/apps/web/app/routes/auth/social-login.tsx',
web:build:     '/app/apps/web/app/routes/auth/password-reset-security.tsx',
web:build:     '/app/apps/web/app/routes/auth/password-security.tsx',
web:build:     '/app/apps/web/app/routes/auth/login.tsx',
web:build:     '/app/apps/web/app/routes/auth/signup.tsx',

2025-09-05T09:50:57.787243445Z [inf]  web:build:     '/app/apps/web/app/routes/auth/forgot-password.tsx',
web:build:     '/app/apps/web/app/routes/billing/invoice/$id.tsx',
web:build:     '/app/apps/web/app/routes/billing/subscription.tsx',
web:build:     '/app/node_modules/.pnpm/@react-router+dev@7.8.2_@react-router+serve@7.8.2_react-router@7.8.2_react-dom@19.1.1_r_10d431edeb53b56084f53f636df7dd8f/node_modules/@react-router/dev/dist/config/defaults/entry.client.tsx',
web:build:     '/app/apps/web/app/routes/pricing/index.tsx',
web:build:     '/app/apps/web/app/routes/billing/payment-methods.tsx',
web:build:     '/app/apps/web/app/routes/auth/2fa-setup.tsx',
web:build:     '/app/apps/web/app/routes/billing/history.tsx',
web:build:     '/app/apps/web/app/routes/checkout/payment.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/venue-owner.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/performer/calendar.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/performer/portfolio.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/performer/bookings.tsx',

2025-09-05T09:50:57.78725558Z [inf]  web:build:     '/app/apps/web/app/routes/dashboard/layout.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/fan.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/organizer.tsx',
web:build:     '/app/apps/web/app/routes/admin/venue-management.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/analytics.tsx',
web:build:     '/app/apps/web/app/routes/settings/privacy.tsx',
web:build:     '/app/apps/web/app/routes/settings/notifications.tsx',
web:build:     '/app/apps/web/app/routes/settings/account.tsx',
web:build:     '/app/apps/web/app/routes/dashboard/organizer/events.tsx',
web:build:     '/app/apps/web/app/routes/profile/edit.tsx',
web:build:     '/app/apps/web/app/routes/profile/customize.tsx',
web:build:     '/app/apps/web/app/routes/settings/security.tsx',
web:build:     '/app/apps/web/app/routes/settings/preferences.tsx',
web:build:     '/app/apps/web/app/routes/settings/data-export.tsx',

2025-09-05T09:50:57.787262128Z [inf]  web:build:     '/app/apps/web/app/routes/venues/listings.tsx',
web:build:     '/app/apps/web/app/routes/settings/visibility.tsx',
web:build:     '/app/apps/web/app/routes/booking/manage.tsx',
web:build:     '/app/apps/web/app/routes/book/performer.tsx',
web:build:     '/app/apps/web/app/routes/book.tsx',
web:build:     '/app/apps/web/app/routes/book-it/index.tsx',

2025-09-05T09:50:57.787267648Z [inf]  web:build:     '/app/apps/web/app/routes/book-it/venues/$id/index.tsx',
web:build:     '/app/apps/web/app/routes/events/create.tsx',
web:build:     '/app/apps/web/app/routes/book-it/venues/index.tsx',

2025-09-05T09:50:57.787326251Z [inf]  web:build:     '/app/apps/web/app/routes/book-it/gigs/index.tsx',
web:build:     '/app/apps/web/app/routes/book-it/venues/$id/book/index.tsx',
web:build:     '/app/apps/web/app/routes/bookings/index.tsx',
web:build:     '/app/apps/web/app/routes/bookings/$id.tsx',
web:build:     '/app/apps/web/app/routes/bookings/confirmation/index.tsx',
web:build:     '/app/apps/web/app/routes/c.$communitySlug.tsx',
web:build:     '/app/apps/web/app/routes/calendars/index.tsx',
web:build:     '/app/apps/web/app/routes/events/manage/$id.tsx',
web:build:     '/app/apps/web/app/routes/calendars/marketplace.tsx',
web:build:     '/app/apps/web/app/routes/careers/index.tsx',
web:build:     '/app/apps/web/app/routes/booking/calendar.tsx',
web:build:     '/app/apps/web/app/routes/contact/index.tsx',
web:build:     '/app/apps/web/app/routes/events/index.tsx',
web:build:     '/app/apps/web/app/routes/community-impact/index.tsx',
web:build:     '/app/apps/web/app/routes/events/$id.tsx',
web:build:     '/app/apps/web/app/routes/gear/index.tsx',
web:build:     '/app/apps/web/app/routes/how-it-works/index.tsx',
web:build:     '/app/apps/web/app/routes/hubs/create.tsx',
web:build:     '/app/apps/web/app/routes/help/index.tsx',
web:build:     '/app/apps/web/app/routes/hubs/index.tsx',
web:build:     '/app/apps/web/app/routes/notifications/index.tsx',
web:build:     '/app/apps/web/app/routes/partner/index.tsx',
web:build:     '/app/apps/web/app/routes/messages/index.tsx',
web:build:     '/app/apps/web/app/routes/performers/index.tsx',
web:build:     '/app/apps/web/app/routes/press/index.tsx',
web:build:     '/app/apps/web/app/routes/performers/$id.tsx',
web:build:     '/app/apps/web/app/routes/social/index.tsx',
web:build:     '/app/apps/web/app/routes/social/notifications.tsx',

2025-09-05T09:50:57.787359604Z [inf]  web:build:     '/app/apps/web/app/routes/social/messages.tsx',
web:build:     '/app/apps/web/app/routes/success-stories/index.tsx',
web:build:     '/app/apps/web/app/routes/tickets/index.tsx',
web:build:     '/app/apps/web/app/routes/tickets/buy.tsx',
web:build:     '/app/apps/web/app/routes/tickets/marketplace/index.tsx',
web:build:     '/app/apps/web/app/routes/tickets/$id/index.tsx',
web:build:     '/app/apps/web/app/routes/venues/index.tsx',
web:build:     '/app/apps/web/app/routes/admin/layout.tsx',
web:build:     '/app/apps/web/app/routes/venues/$id.tsx',
web:build:     ... 5326 more items
web:build:   ]
web:build: }

2025-09-05T09:50:57.897941419Z [inf]  web:build:  ELIFECYCLE  Command failed with exit code 1.

2025-09-05T09:50:57.920328775Z [inf]  web:build: ERROR: command finished with error: command (/app/apps/web) /root/.nix-profile/bin/pnpm run build exited (1)

2025-09-05T09:50:57.920612999Z [inf]  web#build: command (/app/apps/web) /root/.nix-profile/bin/pnpm run build exited (1)

2025-09-05T09:50:57.922168716Z [inf]  
 Tasks:    0 successful, 1 total
Cached:    0 cached, 1 total
  Time:    13.86s 
Failed:    web#build


2025-09-05T09:50:57.930575323Z [inf]   ERROR  run failed: command  exited (1)

2025-09-05T09:50:57.955008264Z [inf]   ELIFECYCLE  Command failed with exit code 1.

2025-09-05T09:50:58.075452489Z [err]  [stage-0 10/12] RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-node_modules/cache,target=/app/node_modules/.cache pnpm install && pnpm build
2025-09-05T09:50:58.128013529Z [err]  Dockerfile:25
2025-09-05T09:50:58.128065311Z [err]  -------------------
2025-09-05T09:50:58.128094105Z [err]  23 |     # build phase
2025-09-05T09:50:58.128102410Z [err]  24 |     COPY . /app/.
2025-09-05T09:50:58.128113500Z [err]  25 | >>> RUN --mount=type=cache,id=s/1d9d9102-ae0f-414e-9595-f8092c520315-node_modules/cache,target=/app/node_modules/.cache pnpm install && pnpm build
2025-09-05T09:50:58.128120579Z [err]  26 |
2025-09-05T09:50:58.128127398Z [err]  27 |
2025-09-05T09:50:58.128134421Z [err]  -------------------
2025-09-05T09:50:58.128141405Z [err]  ERROR: failed to build: failed to solve: process "/bin/bash -ol pipefail -c pnpm install && pnpm build" did not complete successfully: exit code: 1
2025-09-05T09:50:58.133442082Z [err]  Error: Docker build failed