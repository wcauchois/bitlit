// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs

var repliesToggled = {};
function reply(id, bit_id) {
  if(id in repliesToggled) {
    repliesToggled[id].remove();
    delete repliesToggled[id];
  } else {
    var form = $('<form action="/comments" method="post" class="new_subcomment"></form>');
    form.append($('<label>Name</label><br />'));
    form.append($('<input type="text" name="comment[name]" size="30" /><br />'));
    form.append($('<label>Content</label><br />'));
    form.append($('<textarea cols="30" name="comment[content]" rows="4" /><br />'));
    form.append($('<input type="hidden" name="comment[bit_id]" value="'+bit_id+'" />'));
    form.append($('<input type="hidden" name="comment[parent_id]" value="'+id+'" />'));
    form.append($('<input name="commit" type="submit" value="Reply" />'));
    repliesToggled[id] = form;
    $('#comment' + id + ' > .comment_replyspace').append(form);
  }
}

