import del from 'del';

export let clean = (dirs: string[]) =>
  function CleanDirectories() {
    return del(dirs);
  };
