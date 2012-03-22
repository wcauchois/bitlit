class HomeController < ApplicationController
  def index
    current_user
    @recent_bits = Bit.order("id DESC").limit(10)
  end
end
