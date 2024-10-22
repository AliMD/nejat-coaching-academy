class RenderPosts {
  data() {
    return {
      layout: 'post-image',
      pagination: {
        data: 'collections.post',
        size: 1,
        alias: 'post'
      },
      permalink({post}) {
        return post.filePathStem + '/';
      }
    };
  }

  render({post}) {
    return post.content;
  }
}

module.exports = RenderPosts;
