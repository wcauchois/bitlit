class HomeController < ApplicationController
  def index
    @recent_bits = Bit.order("id DESC").limit(10)
  end
end
