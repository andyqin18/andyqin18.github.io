---
title: "Monocular 3D Object Detection with Auxiliary Learning"
excerpt: "Implement **MonoCon** to localize 3D bounding boxes of cars using only image inputs<br/><img src='/images/monocon/monocon_cover16-ezgif.gif'>"
collection: projects
---

Check out the project below 🠯🠯🠯
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% assign repo = site.data.repositories.github_repos[3] %}
    {% include repository/repo.liquid repository=repo %}
</div>



## Intro
In many variations of object detection in self-driving cars, image data is paired with additional context such as data from a depth senser or LiDAR. However, a system must also be able to make these predictions without additional assistance in situations where extra sensors aren’t usable. Specifically we wish to localize 3D bounding boxes of using only 2D images as inputs, this task is called Monocular Object Detection.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/monocon/demo.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example Output of 3D Bounding Boxes (Cars)d
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
